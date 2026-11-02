# 🧠 AI-Powered Resume Generator

Create elegant, AI-enhanced resumes with multiple professional themes, AI-generated summaries, PDF export support, and email delivery. Built using Node.js, Express, EJS, Google Gemini, Puppeteer, and Nodemailer.

---

## 🚀 Features

- ✍️ User-friendly resume form
- 🎨 Multiple resume templates
  - Classic
  - Modern
  - Elegant
  - Creative
  - Minimal
- 🤖 AI-powered professional summary generation using Google Gemini
- 👀 Resume preview before PDF generation
- 📄 PDF export using Puppeteer
- 📧 Email delivery with Ethereal Email preview support
- 🧠 Single Gemini API call per resume generation flow
- 🔐 Environment variable support with dotenv
- ☁️ Render deployment ready

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- EJS

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### AI
- Google Gemini API

### PDF Generation
- Puppeteer

### Email Service
- Nodemailer
- Ethereal Email

### Utilities
- dotenv

---

## 📁 Project Structure

```text
AI-Enhanced-Resume-Generator/

├── app.js
├── generateHighlight.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore

├── public/
│   ├── css/
│   │   ├── styles.css
│   │   ├── classic.css
│   │   ├── modern.css
│   │   ├── elegant.css
│   │   ├── creative.css
│   │   └── minimal.css
│   │
│   ├── icons/
│   │   ├── home.ico
│   │   ├── classic.ico
│   │   ├── modern.ico
│   │   ├── elegant.ico
│   │   ├── creative.ico
│   │   └── minimal.ico
│   │
│   └── js/
│       └── preview.js

├── views/
│   ├── index.ejs
│   ├── classic.ejs
│   ├── modern.ejs
│   ├── elegant.ejs
│   ├── creative.ejs
│   └── minimal.ejs

└── README.md
```

---

## 🧰 Prerequisites

- Node.js v18+
- npm
- Git

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-username/AI-Enhanced-Resume-Generator.git

cd AI-Enhanced-Resume-Generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

Create a file named `.env` in the root directory.

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ▶️ Run Locally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Gemini API Setup

1. Visit Google AI Studio
2. Generate an API key
3. Add the API key to your `.env` file

Example:

```env
GEMINI_API_KEY=your_key_here
```

---

## 🎨 Available Resume Templates

- Classic
- Modern
- Elegant
- Creative
- Minimal

---

## 🤖 AI Summary Workflow

The application follows an optimized workflow:

```text
User Form
    ↓
Preview Resume
    ↓
Gemini API Call
    ↓
AI Summary Generated
    ↓
Resume Preview
    ↓
Generate PDF
    ↓
Reuse Existing Summary
    ↓
Email Delivery
```

### Benefits

✅ Only one Gemini API call

✅ Faster PDF generation

✅ Reduced token consumption

✅ Better user experience

✅ Lower operating cost

---

## 📄 PDF Export

PDFs are generated using Puppeteer.

Features:

- Theme-aware styling
- Print-friendly formatting
- Dynamic AI-generated 