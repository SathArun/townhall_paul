---
title: "Phase 1: Foundation — Project Scaffold & Data"
status: completed
version: "1.0"
phase: 1
---

# Phase 1: Foundation — Project Scaffold & Data

## Phase Context

**GATE**: Read all referenced files before starting this phase.

**Specification References**:
- `[ref: SDD/Constraints; lines: 34-41]` — zero external deps, offline-capable
- `[ref: SDD/Project Commands; lines: 84-89]` — npm commands
- `[ref: SDD/Directory Map; lines: 134-159]` — file structure
- `[ref: SDD/Design System; lines: 362-387]` — CSS variables and tokens
- `[ref: SDD/Questions Data; lines: 192-253]` — all 10 question objects

**Key Decisions**:
- ADR-1: No state library — scaffold with plain React only
- ADR-2: CSS-only animations — no animation packages
- ADR-3: Co-located CSS — each component gets its own `.css` file

**Dependencies**:
- None — this is Phase 1 (no prior phase required)

---

## Tasks

Establishes the buildable project skeleton and static data foundation that all components will consume.

---

- [ ] **T1.1 Vite + React Project Scaffold** `[activity: frontend-ui]`

  1. **Prime**: Read `[ref: SDD/Directory Map; lines: 134-159]` and `[ref: SDD/Project Commands; lines: 84-89]`
  2. **Test**: Verify that `npm run dev` fails before scaffolding (no files exist)
  3. **Implement**:
     - Run `npm create vite@latest . -- --template react` in the project root
     - Delete boilerplate: remove `src/App.css` default content, `src/assets/`, `public/vite.svg`, `src/App.jsx` default content
     - Update `index.html`: set `<title>AI Quiz</title>`, add Inter font link from Google Fonts (`family=Inter:wght@400;500;600;700`)
     - Update `vite.config.js`: keep default React plugin config (no changes needed)
     - Update `src/main.jsx`: import `'./styles/global.css'` before rendering `<App />`
     - Create empty placeholder `src/App.jsx` that returns `<div>Quiz App</div>`
  4. **Validate**: `npm run dev` opens `http://localhost:5173` showing "Quiz App" with no console errors
  5. **Success**:
     - [ ] Dev server starts without errors `[ref: SDD/Project Commands; lines: 84-89]`
     - [ ] Inter font loads (check Network tab: `fonts.googleapis.com` request) `[ref: SDD/Typography; lines: 373-377]`
     - [ ] `src/` directory matches structure in SDD `[ref: SDD/Directory Map; lines: 134-159]`

---

- [ ] **T1.2 Global CSS Design Tokens** `[activity: frontend-ui]`

  1. **Prime**: Read `[ref: SDD/Design System; lines: 362-387]` — all color, typography, shape, spacing tokens
  2. **Test**: Check that styled elements without CSS look unstyled (no variables resolve)
  3. **Implement**: Create `src/styles/global.css` with:
     ```css
     /* CSS Custom Properties — Apple design tokens */
     :root {
       --bg: #F5F5F7;
       --card: #FFFFFF;
       --accent: #007AFF;
       --success: #34C759;
       --error: #FF3B30;
       --text-primary: #1D1D1F;
       --text-secondary: #6E6E73;
       --font: 'Inter', system-ui, -apple-system, sans-serif;
       --radius-card: 20px;
       --radius-button: 14px;
       --radius-tile: 16px;
       --shadow: 0 4px 24px rgba(0,0,0,0.08);
       --shadow-elevated: 0 8px 32px rgba(0,0,0,0.12);
       --pad-card: 40px;
       --gap: 24px;
     }

     /* Reset */
     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

     body {
       font-family: var(--font);
       background: var(--bg);
       color: var(--text-primary);
       font-size: 17px;
       line-height: 1.6;
       -webkit-font-smoothing: antialiased;
     }

     button { cursor: pointer; border: none; background: none; font-family: inherit; }
     input  { font-family: inherit; }
     ```
  4. **Validate**: Verify `body` background is `#F5F5F7` in browser DevTools; Inter renders on all text
  5. **Success**:
     - [ ] All CSS variables resolve correctly `[ref: SDD/Design System; lines: 362-387]`
     - [ ] Font renders as Inter `[ref: SDD/Typography; lines: 373-377]`
     - [ ] `body` background is `#F5F5F7` (Apple light grey) `[ref: SDD/Colors; lines: 363-370]`

---

- [ ] **T1.3 Questions Data Module** `[activity: domain-modeling]`

  1. **Prime**: Read `[ref: SDD/Questions Data; lines: 192-253]` — all 10 question objects with exact `correctIndex` values; read `[ref: SDD/Application Data Models; lines: 164-187]` for the Question entity shape
  2. **Test**: Before creating file, verify that importing `questions` from `'./data/questions'` throws a module-not-found error
  3. **Implement**: Create `src/data/questions.js` containing the exact array of 10 question objects as specified in the SDD. Key fields per object: `id`, `category`, `difficulty`, `text`, `options` (array of 4 strings), `correctIndex` (0-based), `emoji`
     - Questions 1–9: `category: 'ai'`, difficulties: easy (Q1,2,6), medium (Q3,4,5,7,8,9)
     - Question 10: `category: 'cricket'`, `difficulty: 'hard'`, `correctIndex: 2` (Sachin Tendulkar — 100)
  4. **Validate**: Add a temporary `console.log(questions.length, questions[9].category)` in `main.jsx` — verify output is `10 cricket` in browser console; remove the log after
  5. **Success**:
     - [ ] Module exports array of exactly 10 objects `[ref: SDD/Questions Data; lines: 192-253]`
     - [ ] `questions[9].category === 'cricket'` and `questions[9].correctIndex === 2` `[ref: SDD/Cricket Question AC]`
     - [ ] All `correctIndex` values match the intended correct answers from the SDD `[ref: SDD/Questions Data; lines: 192-253]`
     - [ ] Each question has `id`, `text`, `options` (length 4), `correctIndex`, `emoji`, `category`, `difficulty` `[ref: SDD/Application Data Models; lines: 164-187]`

---

- [ ] **T1.4 Phase 1 Validation** `[activity: validate]`

  - Open `http://localhost:5173` in Chrome
  - Verify: page background is `#F5F5F7`, Inter font loads, no console errors
  - Verify: `src/data/questions.js` exports 10 well-formed objects
  - Run `npm run build` — verify it completes with no errors
  - **Success**: Dev server runs, build compiles, data module is correct — Phase 2 can begin
