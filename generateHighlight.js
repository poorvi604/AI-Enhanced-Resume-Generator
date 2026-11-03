const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function generateHighlight(name, role, skills) {

  const model = genAI.getGenerativeModel({
    model: "gemini-flash-lite-latest"
  });


  const prompt = `
Write a professional resume summary in 2-3 sentences.

Name: ${name}
Role: ${role}
Skills: ${skills}

Return only the summary.
`;

  try {
    const result = await model.generateContent(prompt);

    return result.response
      .text()
      .trim();

  } catch (error) {
    console.error(
      "Gemini generation error:",
      error
    );

    return `${name} is a skilled ${role} with expertise in ${skills}.`;
  }
}

module.exports = { generateHighlight };

