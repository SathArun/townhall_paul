---
title: "Phase 3: Integration — State Machine & Polish"
status: completed
version: "1.0"
phase: 3
---

# Phase 3: Integration — State Machine & Polish

## Phase Context

**GATE**: Phase 1 and Phase 2 must be complete. All components must exist and render correctly.

**Specification References**:
- `[ref: SDD/State Transitions; lines: 256-278]` — full state machine: intro→question→result→intro
- `[ref: SDD/Runtime View Primary Flow; lines: 285-328]` — complete 12-step quiz run
- `[ref: SDD/Application Data Models AppState; lines: 177-187]` — all state fields
- `[ref: SDD/Quality Requirements; lines: 484-490]` — performance and usability targets
- `[ref: SDD/AC — all sections; lines: 495-514]` — full acceptance criteria

**Key Decisions**:
- ADR-1: All state in `App.jsx` `useState` — no external store
- ADR-4: No backend — score calculated client-side from `answers[]` vs `questions[i].correctIndex`

**Dependencies**:
- Phase 1 complete (scaffold, global CSS, questions.js)
- Phase 2 complete (all 5 components built and tested in isolation)

---

## Tasks

Wires all components into the App state machine, adds screen transition animations, runs end-to-end validation, and prepares for the townhall demo.

---

- [ ] **T3.1 App State Machine** `[activity: frontend-ui]`

  1. **Prime**: Read `[ref: SDD/State Transitions; lines: 256-278]` for the full state machine; read `[ref: SDD/Application Data Models AppState; lines: 177-187]` for all 6 state fields; read `[ref: SDD/Runtime View Primary Flow; lines: 285-328]`
  2. **Test**: With all component stubs in place, manually trace through the state machine on paper:
     - `onStart("Alice")` → screen becomes `'question'`, `currentIndex=0`, `answers=[]`, `score=0`
     - `onSelect(1)` on Q1 → `selectedIndex=1`, `revealed=true`, answers updated
     - After 1200ms `onDone()` → `currentIndex=1`, `revealed=false`, `selectedIndex=null`
     - After Q10 `onDone()` → screen becomes `'result'`, score calculated
     - `onRestart()` → screen becomes `'intro'`, all state reset
  3. **Implement**: Write `src/App.jsx` with the full state machine:

     ```jsx
     // State:
     const [screen, setScreen] = useState('intro')
     const [playerName, setPlayerName] = useState('')
     const [currentIndex, setCurrentIndex] = useState(0)
     const [selectedIndex, setSelectedIndex] = useState(null)
     const [revealed, setRevealed] = useState(false)
     const [answers, setAnswers] = useState([])
     const [score, setScore] = useState(0)

     // onStart(name): setPlayerName(name), setScreen('question'), reset index/answers/score
     //
     // onSelect(optionIndex):
     //   1. update answers array (immutably append optionIndex)
     //   2. setSelectedIndex(optionIndex)
     //   3. setRevealed(true)
     //   — FeedbackOverlay now visible —
     //
     // onDone() [called by FeedbackOverlay after 1200ms]:
     //   1. setRevealed(false)
     //   2. setSelectedIndex(null)
     //   3. if currentIndex < questions.length - 1:
     //        setCurrentIndex(i => i + 1)
     //      else:
     //        calculate score = answers.filter((a,i) => a === questions[i].correctIndex).length
     //        setScore(finalScore)
     //        setScreen('result')
     //
     // onRestart(): reset ALL state to initial values, setScreen('intro')
     //
     // Render:
     //   screen === 'intro'    → <IntroScreen onStart={onStart} />
     //   screen === 'question' → <>
     //                             <QuestionCard question={questions[currentIndex]}
     //                                           index={currentIndex} total={questions.length}
     //                                           selectedIndex={selectedIndex} revealed={revealed}
     //                                           onSelect={onSelect} />
     //                             <FeedbackOverlay correct={selectedIndex === questions[currentIndex].correctIndex}
     //                                              visible={revealed}
     //                                              onDone={onDone} />
     //                           </>
     //   screen === 'result'   → <ResultsScreen score={score} total={questions.length}
     //                                          answers={answers} questions={questions}
     //                                          playerName={playerName}
     //                                          onRestart={onRestart} />
     ```

     Write `src/App.css`:
     - Minimal: just `#root { min-height: 100vh; }` and screen transition wrapper if needed

  4. **Validate**: Complete one full quiz run manually in browser:
     - Enter name → click Start → Q1 appears with 10% progress
     - Select any answer → overlay flashes → Q2 loads → progress 20%
     - Continue through all 10 questions → results screen appears
     - Verify score is correct (count your correct answers)
     - Verify grade badge matches the score threshold
     - Click Play Again → back to intro screen
  5. **Success**:
     - [ ] `onStart(name)` transitions to question screen at Q1 `[ref: SDD/AC Quiz Flow; lines: 496]`
     - [ ] `onSelect` → feedback → `onDone` → next question in correct sequence `[ref: SDD/AC Quiz Flow; lines: 497-499]`
     - [ ] After Q10, score is correctly computed from `answers[]` vs `correctIndex` `[ref: SDD/State Transitions; lines: 272-277]`
     - [ ] `onRestart` resets all state fields to initial values `[ref: SDD/AC Usability; lines: 511]`
     - [ ] `FeedbackOverlay` receives `correct` prop based on selected vs `correctIndex` `[ref: SDD/State Transitions; lines: 265-269]`

---

- [ ] **T3.2 Screen Transition Animation** `[activity: frontend-ui]`

  1. **Prime**: Read `[ref: SDD/Animation Spec screen transitions; lines: 392-396]` — fade-in + translateY(20px→0), 400ms, spring easing
  2. **Test**: Navigate intro→question→result — verify screens appear abruptly without animation (the baseline before this task)
  3. **Implement**: Add a keyed wrapper in `App.jsx` so React re-mounts components on screen change, triggering CSS entry animations:
     ```jsx
     // Wrap each screen in a div with key={screen}
     // CSS: .screen-enter { animation: slideUp 400ms cubic-bezier(0.16,1,0.3,1) both }
     // The slideUp keyframe is already defined in IntroScreen.css — either move it to global.css
     // or define it locally for the App wrapper
     ```
     Add to `src/styles/global.css`:
     ```css
     @keyframes slideUp {
       from { opacity: 0; transform: translateY(20px); }
       to   { opacity: 1; transform: translateY(0); }
     }
     .screen { animation: slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) both; }
     ```
     Apply `className="screen"` to the top-level div wrapping each screen in `App.jsx`.

  4. **Validate**: Navigate between all three screens — each screen slides up smoothly on enter; no stutter or jump
  5. **Success**:
     - [ ] Intro → Question: question card slides up `[ref: SDD/Animation Spec; lines: 392-396]`
     - [ ] Question → Result: results card slides up `[ref: SDD/Animation Spec; lines: 392-396]`
     - [ ] Result → Intro: intro card slides up on Play Again `[ref: SDD/Animation Spec; lines: 392-396]`
     - [ ] Animations play at 60fps on the demo laptop (no jank) `[ref: SDD/Quality Requirements; lines: 484-490]`

---

- [ ] **T3.3 End-to-End Acceptance Validation** `[activity: validate]`

  1. **Prime**: Read `[ref: SDD/AC — all sections; lines: 495-514]` — all 13 acceptance criteria
  2. **Test baseline**: Open `http://localhost:5173`, open DevTools console (should be empty)
  3. **Validate each criterion**:

     | # | Criterion | Test Action | Expected |
     |---|-----------|-------------|----------|
     | AC1 | Start button disabled when name empty | Load page, check Start button | Disabled (`opacity: 0.4`) |
     | AC2 | Start transitions to Q1 with progress | Type name, click Start | Q1 loads, progress bar at 10% |
     | AC3 | Answer selection reveals feedback | Click any tile | Overlay appears within 100ms |
     | AC4 | Auto-advance after 1200ms | Wait after selecting | Next question loads automatically |
     | AC5 | Q10 transitions to results | Complete all 10 Qs | Results screen appears |
     | AC6 | Score counter animates | Arrive at results | Counter increments 0→score over 1.5s |
     | AC7 | Grade badge correct | Score 10/8-9/6-7/<6 | Legend/Expert/Solid/Keep Learning |
     | AC8 | Confetti for ≥8 | Get 8+ correct | Confetti falls; Play Again still clickable |
     | AC9 | Breakdown shows all Qs | Check results screen | 10 rows with ✓/✗ |
     | AC10 | Re-selection blocked | Click tile, try clicking again | Second click has no effect |
     | AC11 | Play Again resets | Click Play Again | Intro screen, name input empty |
     | AC12 | Cricket question at position 10 | Reach Q10 | Cricket wildcard question appears |
     | AC13 | 🏏 indicator on cricket Q | Check Q10 | Cricket badge/emoji visible |

  4. **Fix**: Address any criterion that fails before marking this task complete
  5. **Success**: All 13 acceptance criteria verified in browser `[ref: SDD/AC; lines: 495-514]`

---

- [ ] **T3.4 Demo Readiness Check** `[activity: validate]`

  1. **Prime**: Read `[ref: SDD/Gotchas; lines: 520-524]` — font offline risk, will-change, confetti z-index
  2. **Verify**:
     - [ ] Run `npm run build` — build completes, `dist/` bundle < 200KB gzipped `[ref: SDD/Quality Requirements]`
     - [ ] Open `dist/` via `npm run preview` — verify production build works identically to dev
     - [ ] Add `will-change: transform` to AnswerTile CSS and confetti spans (jank mitigation)
     - [ ] Verify confetti `z-index: 200` and `pointer-events: none` — Play Again button is always clickable `[ref: SDD/Gotchas; lines: 523]`
     - [ ] Pre-load the app in Chrome before the demo to cache Inter font (or embed Inter as local woff2 if offline venue risk is high)
     - [ ] Test at 1080p screen resolution — all text legible, click targets ≥ 48px height `[ref: SDD/Quality Requirements; lines: 487-488]`
  3. **Demo Script**:
     ```
     1. Open http://localhost:5173
     2. Show the audience: "This entire app was written by Claude in one session"
     3. Enter a name, click Start
     4. Play through all 10 questions (volunteer from audience if possible)
     5. Reveal the results screen — celebrate the grade
     6. Show the questions.js file to demonstrate how simple the data is
     7. Show App.jsx to demonstrate the state machine (~50 lines)
     ```
  4. **Success**:
     - [ ] Production build < 200KB gzipped `[ref: SDD/Deployment; lines: 343-347]`
     - [ ] App runs correctly from `npm run preview` (production mode) `[ref: SDD/Project Commands; lines: 84-89]`
     - [ ] No console errors or warnings in Chrome DevTools during a full quiz run
     - [ ] All animations smooth at 60fps at 1080p
