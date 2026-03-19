# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:5173 (hot reload)
npm run build     # Production build to /dist
npm run preview   # Preview production build locally
```

No test or lint commands are configured.

## Architecture

This is a fully client-side React 18 + Vite quiz app. No backend, no external API calls.

**State machine in `src/App.jsx`** — manages three screens (`intro` → `question` → `result`) and all quiz state: `screen`, `playerName`, `currentIndex`, `selectedIndex`, `revealed`, `answers`, `score`. All logic flows through handlers here (`onStart`, `onSelect`, `onDone`, `onRestart`).

**Data in `src/data/questions.js`** — array of 10 question objects with shape `{ id, category, difficulty, emoji, text, options[], correctIndex }`. This is the single source of truth for quiz content.

**Component tree:**
- `IntroScreen` — name entry, calls `onStart(name)`
- `QuestionCard` — renders question + 4 `AnswerTile` components; stateless, driven entirely by props
- `AnswerTile` — renders one answer button; visual state (default/selected/correct/wrong) derived from props `selected`, `correct`, `revealed`
- `FeedbackOverlay` — full-screen correct/wrong flash; auto-calls `onDone` after 1.2s via `useEffect`
- `ResultsScreen` — animated score counter, grade badge, per-question breakdown, confetti for score ≥ 8

**Styling** uses a CSS variable system defined in `src/styles/global.css` (Apple design language: `--accent: #007AFF`, `--success: #34C759`, `--error: #FF3B30`, etc.). Each component has a co-located `.css` file. No CSS framework or CSS-in-JS.

## Design Spec

The file `.start/ideas/2026-03-18-ai-quiz-app.md` is the authoritative design spec — it contains question content, UI color palette, animation timings, and grade thresholds.
