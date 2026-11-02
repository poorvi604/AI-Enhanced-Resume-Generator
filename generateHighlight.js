const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateHighlight(name, role, skills) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Write a one-line professional resume summary for:

Name: ${name}
Role: ${role}
Skills: ${skills}

Return only the summary.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("❌ Gemini generation error:", error);
    return `${name} is a skilled ${role} in ${skills.split(",")[0].trim()}.`;
  }
}

module.exports = { generateHighlight };