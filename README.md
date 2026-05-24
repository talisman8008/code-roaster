# 🔥 Code Roaster

> AI-powered code quality analytics platform. Not just "does it work" — but "is it actually good?"

[![Node.js](https://img.shields.io/badge/Node.js-24.x-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19.x-blue)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## What is Code Roaster?

Most coding platforms tell you if your code **works**.  
Code Roaster tells you if your code is **actually good** — and tracks how you improve over time.

Submit code from LeetCode or CodeChef via a browser extension, get roasted by AI, see your Clean Code Rating improve submission by submission.

---

## Core Features

| Feature | Description |
|---|---|
| 🤖 AI Analysis | Google Gemini API provides contextual, specific feedback |
| 🔍 Static Analysis | ESLint, Flake8, cppcheck for deterministic rule-based checks |
| ⚡ CP Mode | Time/space complexity, edge cases, TLE pattern detection |
| 🧑‍💻 Dev Mode | Readability, DRY violations, modularity, best practices |
| 📈 Progress Tracking | CCR score tracked across all submissions over time |
| 🔄 Before/After Diff | See exactly what improved between resubmissions |
| 🏆 Clean Code Rating | Gamified score relative to your own baseline — not absolute |
| 🔥 Roast Mode | Brutal, witty, savage feedback from your AI senior dev |
| 🧑‍💼 Review Mode | Professional, constructive feedback for sharing with teams |
| 🧩 Browser Extension | One-click analysis from inside LeetCode / CodeChef |
| 📊 Dashboard | Score graphs, language breakdown, submission history |
| 🔗 Shareable Report Card | Public URL showing your CCR trend and top improvements |

---

## Tech Stack

```
client/          React + Vite + Tailwind CSS v3
server/          Node.js + Express.js (ES Modules)
database/        MongoDB Atlas + Mongoose v9
ai/              Google Gemini API
static/          ESLint · Flake8 · cppcheck
extension/       Chrome Extension Manifest V3
```

---

## Project Structure

```
Code-Roaster/
├── client/                    # React frontend
│   └── src/
│       ├── pages/             # Home, Dashboard, Login, Register, History
│       ├── components/        # CodeEditor, ScoreCard, CCRChart, DiffView, Navbar
│       ├── hooks/             # useAuth, useAnalysis
│       ├── services/          # api.js — all fetch calls live here
│       └── context/           # AuthContext
│
├── server/                    # Node.js backend
│   ├── config/                # db.js — MongoDB connection
│   ├── models/                # User.js, Submission.js
│   ├── routes/                # auth.js, analyze.js, submissions.js
│   ├── controllers/           # authController, analyzeController, submissionController
│   ├── middleware/            # authMiddleware, errorHandler
│   ├── services/              # geminiService, staticAnalyzer, cacheService
│   └── utils/                 # hashCode, promptBuilder, scoreCalculator
│
└── extension/                 # Chrome browser extension
    ├── manifest.json
    ├── content.js             # Scrapes code from LeetCode/CodeChef DOM
    ├── background.js
    └── popup.html / popup.js
```

---

## Roadmap

### ✅ Phase 1 — Foundation & Authentication
> Backend server, database connection, and user auth fully working.

- [x] Node.js + Express server with MongoDB Atlas
- [x] User registration and login with JWT authentication
- [x] Password hashing with bcrypt
- [x] Protected route middleware
- [x] React + Vite + Tailwind CSS v3 frontend scaffold

---

### 🔄 Phase 2 — Core Analysis Engine *(in progress)*
> The heart of the app — AI + static analysis pipeline.

- [ ] SHA-256 caching to avoid duplicate Gemini API calls
- [ ] Google Gemini AI integration for code feedback
- [ ] Static analyzers — ESLint (JS), Flake8 (Python), cppcheck (C/C++)
- [ ] CP Mode vs Dev Mode analysis
- [ ] Roast Mode vs Professional Review Mode
- [ ] Scoring across 4 dimensions: readability, efficiency, structure, best practices
- [ ] Clean Code Rating (CCR) calculation

---

### ⏳ Phase 3 — Dashboard & Progress Tracking
> Making improvement visible over time.

- [ ] Submission history saved per user
- [ ] Before/after diff view on resubmission
- [ ] CCR score graph over time (Recharts)
- [ ] Language-wise performance breakdown
- [ ] Shareable public report card URL

---

### ⏳ Phase 4 — Browser Extension
> Analyse code without leaving LeetCode or CodeChef.

- [ ] Chrome Extension (Manifest V3)
- [ ] One-click code grab from LeetCode Monaco editor
- [ ] CodeChef support
- [ ] Overlay panel showing scores inside the coding platform
- [ ] JWT auth stored in Chrome extension storage

---

### ⏳ Phase 5 — Deploy & Launch
> Getting it live and in front of real users.

- [ ] Backend deployed to Railway / Render
- [ ] Frontend deployed to Vercel
- [ ] Extension published to Chrome Web Store
- [ ] Onboarding flow for new users

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| POST | `/api/analyze` | ✅ | Submit code for analysis |
| GET | `/api/submissions` | ✅ | Get submission history |
| GET | `/api/submissions/:id` | ✅ | Get single submission |
| GET | `/api/submissions/history` | ✅ | Get CCR scores over time |

---

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.x (for Flake8 static analysis)
- MongoDB Atlas account (free tier)
- Google Gemini API key — free at [aistudio.google.com](https://aistudio.google.com)

### Server Setup
```bash
cd server
npm install
# create .env — see .env.example
node index.js
```

### Client Setup
```bash
cd client
npm install
npm run dev
```

### Environment Variables
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/code-roaster
JWT_SECRET=your_random_secret
GEMINI_API_KEY=your_gemini_key
```

---

## Contributing

This project is currently in active development. Feel free to open issues or submit PRs.

---

## Author

**Devesh** — First year AI/DS student  
Building this to track how my code quality improves over time.  
GitHub: [@talisman8008](https://github.com/talisman8008)

---

*"Your code works. But is it actually good?"*
