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

## Build Phases & Progress

### ✅ Phase 0 — Project Setup
- [x] Root folder structure created (`client/`, `server/`, `extension/`)
- [x] Git repository initialised
- [x] Pushed to GitHub — `github.com/talisman8008/code-roaster`
- [x] `.gitignore` configured — `node_modules/`, `.env`, `dist/` excluded

---

### ✅ Phase 1 — Client Scaffold
- [x] Vite + React project created
- [x] Tailwind CSS v3 installed and configured
- [x] All page components created (placeholder) — Home, Dashboard, Login, Register, History
- [x] All UI components created (placeholder) — CodeEditor, ScoreCard, CCRChart, DiffView, ModeToggle, Navbar
- [x] Custom hooks created — `useAuth.js`, `useAnalysis.js`
- [x] Services layer created — `api.js`
- [x] Auth context created — `AuthContext.jsx`
- [x] Unnecessary `App.css` removed (Tailwind only)

---

### ✅ Phase 2 — Server Foundation
- [x] Node.js + Express server initialised with ES Modules (`"type": "module"`)
- [x] Dependencies installed — express, mongoose, dotenv, bcryptjs@2.4.3, jsonwebtoken, cors
- [x] All server folders created — config, models, routes, controllers, middleware, services, utils
- [x] `config/db.js` — Mongoose connection to MongoDB Atlas
- [x] `server/index.js` — Express entry point running on port 5000
- [x] `.env` configured with PORT, MONGO_URI, JWT_SECRET, GEMINI_API_KEY
- [x] MongoDB Atlas cluster created and connected ✓
- [x] All placeholder files created across routes, controllers, services, utils

---

### ✅ Phase 3 — Database Models
- [x] `models/Users.js` — schema with name, email, password, timestamps
- [x] Pre-save bcrypt hook (Mongoose 9 async style — no `next` callback)
- [x] `matchPassword()` instance method for login
- [x] `models/Submission.js` — full schema with userId, code, language, mode, tone, hash, scores{}, ccrScore, aiResponse, staticIssues[], fromCache

---

### ✅ Phase 4 — Authentication
- [x] `middleware/authMiddleware.js` — JWT verification, attaches `req.user`
- [x] `controllers/authController.js` — `register()` and `login()` with `generateToken()`
- [x] `routes/auth.js` — POST `/api/auth/register` and POST `/api/auth/login`
- [x] **Tested in Postman** — register returns 201 ✓, login returns 200 ✓, JWT token generated ✓

---

### 🔄 Phase 5 — Core Analysis Pipeline *(in progress)*
- [ ] `utils/hashCode.js` — SHA-256 hashing with Node crypto
- [ ] `utils/promptBuilder.js` — builds Gemini prompt (cp/dev mode, roast/review tone)
- [ ] `utils/scoreCalculator.js` — computes CCR from 4 dimension scores
- [ ] `services/geminiService.js` — calls Gemini API, parses JSON response
- [ ] `services/cacheService.js` — checks MongoDB for duplicate submissions by hash
- [ ] `services/staticAnalyzer.js` — shells out to ESLint/Flake8/cppcheck
- [ ] `controllers/analyzeController.js` — orchestrates full analysis pipeline
- [ ] `routes/analyze.js` — protected POST `/api/analyze`
- [ ] Tested in Postman — code in, scores out ✓

---

### ⏳ Phase 6 — Submission History
- [ ] `controllers/submissionController.js` — getHistory, getById, getScoresOverTime
- [ ] `routes/submissions.js` — GET `/api/submissions`
- [ ] Tested in Postman ✓

---

### ⏳ Phase 7 — React Frontend
- [ ] `AuthContext.jsx` — store user + JWT in React state
- [ ] `api.js` — all axios calls (login, register, analyze, getHistory)
- [ ] `Login.jsx` and `Register.jsx` — forms wired to backend
- [ ] `Home.jsx` — code editor, language selector, mode toggle, submit button
- [ ] `ScoreCard.jsx` — displays 4 dimension scores
- [ ] `Dashboard.jsx` — CCR chart (Recharts), language breakdown, stat cards
- [ ] `History.jsx` — submission history table
- [ ] `DiffView.jsx` — before/after score comparison

---

### ⏳ Phase 8 — Dashboard & CCR
- [ ] CCR formula finalised in `scoreCalculator.js`
- [ ] CCR displayed relative to user's own baseline (not absolute)
- [ ] Recharts line graph of CCR over time
- [ ] Shareable report card (public URL, no auth required)
- [ ] Roast Mode vs Professional Review Mode toggle in UI

---

### ⏳ Phase 9 — Browser Extension
- [ ] `manifest.json` — Chrome MV3 config
- [ ] `content.js` — grabs code + language from LeetCode Monaco editor DOM
- [ ] `popup.html` / `popup.js` — extension toolbar UI
- [ ] `background.js` — service worker
- [ ] Overlay panel renders analysis result inside LeetCode
- [ ] JWT stored in Chrome extension storage for auth
- [ ] Tested on LeetCode ✓

---

### ⏳ Phase 10 — Deploy & Launch
- [ ] Backend deployed to Railway or Render (free tier)
- [ ] Frontend deployed to Vercel
- [ ] Extension submitted to Chrome Web Store
- [ ] Onboarding seed flow — 2 submissions at signup for instant data
- [ ] Launch post on Reddit (r/leetcode, r/learnprogramming)
- [ ] Launch post on LinkedIn

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
- Python 3.x (for Flake8)
- MongoDB Atlas account
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))

### Server Setup
```bash
cd server
npm install
# create .env with PORT, MONGO_URI, JWT_SECRET, GEMINI_API_KEY
node index.js
```

### Client Setup
```bash
cd client
npm install
npm run dev
```

---

## Known hiccups

- **Mongoose 9 async hooks** — do NOT use `next()` in pre-save hooks. Mongoose 9 handles async automatically.
- **bcryptjs** — use v2.4.3, not v3.x. v3 broke the API.
- **ES Modules** — all local imports need the `.js` extension explicitly.
- **Tailwind** — use v3, not v4. `npx tailwindcss@3 init -p` for setup.

---

## Author

**Devesh** — First year AI/DS student  
Building this to track how my code quality improves over time.  
GitHub: [@talisman8008](https://github.com/talisman8008)

---

*"Your code works. But is it actually good?"*