const dotenv = require("dotenv");
dotenv.config(); 

const express = require("express");

const nodemailer = require("nodemailer");
const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");
const { generateHighlight } = require("./generateHighlight");


const app = express();
app.set('trust proxy', 1); // Trust first proxy if behind a reverse proxy
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Limit request body size to 10MB
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

const VALID_TEMPLATES = [
  "classic",
  "modern",
  "creative",
  "minimal",
  "elegant"
];


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/preview',async (req, res) => {
  try{
    const { name, skills, role, experience, template } = req.body;
    if ([name, skills, role, experience, template].some(f => !f || f.trim() === "")) {
    return res.send("⚠️ Please fill in all fields to preview your resume.");
    }
    
    if (!VALID_TEMPLATES.includes(template)) {
      return res.send("⚠️ Invalid template selected. Please choose a valid template.");
    }


    let suggestedBullet;

    try {
      suggestedBullet = await generateHighlight(
      name,
      role,
      skills
      );
    } catch(err) {
      console.error(err);

      suggestedBullet =`${role} with expertise in ${skills}`;
    }
    res.render(template, { name, skills, role, experience, suggestedBullet, template });
  } catch (error) {
    console.error("❌ Preview Generation Error:", error);
    res.status(500).send("Something went wrong while generating the preview. Please try again.");
  }
});

app.post("/generate", async (req, res) => {
  try {
    const { name, skills, role, experience, template, email, suggestedBullet } = req.body;
    console.log("🛠️ Form Data Received:", req.body);

    if ([name, skills, role, experience, template, email, suggestedBullet].some(field => !field || field.trim() === "")) {
    return res.send("⚠️ Please fill in all fields and enter your email to generate your resume.");
  }
  if (!VALID_TEMPLATES.includes(template)) {
    return res.send("⚠️ Invalid template selected. Please choose a valid template.");
  }
  console.log("🧠 AI-generated summary:", suggestedBullet);
  console.log("📦 PDF Data:", { name, skills, role, experience, suggestedBullet });

    const htmlContent = await renderEJS(template, {
      name,
      skills,
      role,
      experience,
      suggestedBullet,
      template
    });
    const browser = await puppeteer.launch({headless: true, executablePath: "/opt/render/.cache/puppeteer/chrome/linux-138.0.7204.157/chrome-linux64/chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"
      ]});
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" , printBackground: true });
    await browser.close();


    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  
    const mailOptions = {
      from: testAccount.user,
      to: email,
      subject: "Your AI-Generated Resume",
      text: "Attached is your resume PDF.",
      attachments: [
        {
          filename: `${name}-resume.pdf`,
          content: pdfBuffer
        }
      ]
    };
    const info= await transporter.sendMail(mailOptions);
    const previewURL = nodemailer.getTestMessageUrl(info);
    res.send(`✅ Resume sent to <b>${email}</b>!<br><a href="${previewURL}" target="_blank">View Email Preview</a>`);
  } catch (error) {
    console.error("❌ Resume Generation Error:", error);
    res.status(500).send("Something went wrong while generating the resume. Please try again.");
  }
});


function renderEJS(templateName, data) {
  return new Promise((resolve, reject) => {
    const trimmedName = templateName.replace('.ejs', '');
    app.render(trimmedName, data, (err, html) => {
      if (err) {
         console.error("❌ Template Rendering Error:", err);
         return reject(err);
     }


      const cssPath = path.join(__dirname, "public", "css", `${trimmedName}.css`);
      let cssContent = "";

      try {
        cssContent = fs.readFileSync(cssPath, "utf8");
        console.log(`✅ Loaded CSS: ${cssPath}`);

      } catch (err){
        // If no specific CSS found, fallback to default
        console.warn(`⚠️ No CSS found for template "${trimmedName}", using fallback`);

      }

      const styledHTML = html.replace("</head>", `<style>
        ${cssContent} 
        .no-print { display: none; }
        </style></head>`);
      console.log("✅ Final styled HTML ready for PDF generation");
      resolve(styledHTML);
    });
  });
}
process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  // open(`http://localhost:${PORT}`);
});