# AI Quiz App — Townhall Demo

**Date:** 2026-03-18
**Purpose:** Live townhall demo in India showing how easy it is to build an app with Claude.

---

## Context

- Projected on screen, solo play (presenter or volunteer plays live)
- Tech team audience
- Goal: wow the room with a polished app Claude built

---

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Pure CSS (Apple design language — no UI library)
- **Animations:** CSS transitions + keyframes (no Framer Motion dependency)
- **State:** React useState in App component (no Redux/Zustand)

---

## App Structure

### Components

| Component | Responsibility |
|-----------|---------------|
| `App` | State machine: intro → question → result |
| `IntroScreen` | Title, name entry, start button |
| `QuestionCard` | Question text, 4 answer tiles, progress bar |
| `FeedbackOverlay` | Correct/wrong flash after each answer |
| `ResultsScreen` | Score counter, grade badge, confetti, breakdown |

### State (in App)

```js
{
  screen: 'intro' | 'question' | 'result',
  playerName: string,
  currentIndex: number,      // 0-9
  answers: number[],         // selected option index per question
  score: number
}
```

---

## Questions (10 total)

### AI Questions (9)

1. What does "GPT" stand for? *(easy)*
   Options: Giant Processing Tool / **Generative Pre-trained Transformer** / Global Pattern Trainer / Graphic Processing Technology

2. Which company created ChatGPT? *(easy)*
   Options: Google / Meta / **OpenAI** / Microsoft

3. What architecture powers modern large language models? *(medium)*
   Options: LSTM / CNN / **Transformer** / Recurrent Networks

4. What is "hallucination" in AI? *(medium)*
   Options: An AI dreaming / **When AI generates false but confident information** / A rendering glitch / An overheating issue

5. What does RAG stand for? *(medium)*
   Options: Rapid AI Generation / **Retrieval-Augmented Generation** / Random Algorithmic Guessing / Recurrent Attention Graph

6. What is a "prompt" in the context of AI? *(easy)*
   Options: A stage cue / A memory address / **The input text you give to an AI model** / A training dataset

7. What is fine-tuning an AI model? *(medium)*
   Options: Adjusting screen brightness / **Further training on specific data to specialise the model** / Deleting bad outputs / Compressing model weights

8. Which of these is NOT an AI language model? *(medium)*
   Options: Claude / GPT-4 / Gemini / **Hadoop**

9. What does "multimodal" mean in AI? *(medium)*
   Options: Having multiple personalities / Using many servers / **Processing multiple types of input (text, image, audio)** / Running on multiple GPUs

### Cricket Wildcard — Question 10 (hard)

**Question:** In Test cricket, which Indian batsman holds the world record for the most international centuries — and how many has he scored?

Options:
- Sourav Ganguly — 38
- Virat Kohli — 80
- **Sachin Tendulkar — 100**
- Rohit Sharma — 55

*Note: This is intentionally harder. The 100 centuries milestone is iconic but many people misremember the number.*

---

## UI Design Language (Apple Aesthetic)

### Typography
- Font: `Inter` (Google Fonts) — closest free equivalent to SF Pro
- Heading: 32px bold, tight tracking
- Body: 17px, regular

### Colours
- Background: `#F5F5F7` (Apple page grey)
- Card: `#FFFFFF`
- Accent: `#007AFF` (SF Blue)
- Success: `#34C759` (Apple Green)
- Error: `#FF3B30` (Apple Red)
- Text: `#1D1D1F`

### Shape & Spacing
- Border radius: `20px` on cards, `12px` on buttons
- Shadows: `0 4px 24px rgba(0,0,0,0.08)`
- Padding: `32px` inside cards

### Animations
- Answer selection: scale pulse `1.0 → 1.02 → 1.0` on click
- Correct: green flash + checkmark
- Wrong: red flash + shake
- Screen transitions: fade + slide up
- Results score: count-up animation from 0 to final score

---

## Gamification — Results Screen

### Score Display
Large animated counter that counts up from 0 to final score over 1.5s.

### Grade Badges

| Score | Badge | Label |
|-------|-------|-------|
| 10/10 | 🏆 | Legend |
| 8–9/10 | ⭐ | Expert |
| 6–7/10 | 🎯 | Solid |
| < 6/10 | 📚 | Keep Learning |

### Effects
- Confetti burst animation for score ≥ 8
- Per-question breakdown: green tick / red cross for each Q
- "Play Again" button resets to intro

---

## File Structure

```
townhall_paul/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── IntroScreen.jsx
    │   ├── QuestionCard.jsx
    │   ├── FeedbackOverlay.jsx
    │   └── ResultsScreen.jsx
    ├── data/
    │   └── questions.js
    └── styles/
        └── global.css
```

---

## Running the App

```bash
npm install
npm run dev
# Opens at http://localhost:5173
```
