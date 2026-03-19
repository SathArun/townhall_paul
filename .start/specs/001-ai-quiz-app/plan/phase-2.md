---
title: "Phase 2: Components — UI Building Blocks"
status: completed
version: "1.0"
phase: 2
---

# Phase 2: Components — UI Building Blocks

## Phase Context

**GATE**: Phase 1 must be complete. Read all referenced files before starting.

**Specification References**:
- `[ref: SDD/Component Responsibilities Table; lines: 122-131]` — props/callbacks per component
- `[ref: SDD/Animation Spec; lines: 390-431]` — all keyframe and transition specs
- `[ref: SDD/Design System; lines: 362-387]` — CSS tokens (use CSS vars, not hardcoded values)
- `[ref: SDD/Grade Badge Logic; lines: 443-450]` — scoring thresholds
- `[ref: SDD/Error Handling; lines: 332-335]` — disabled state, pointer-events

**Key Decisions**:
- ADR-2: All animation via CSS keyframes — no JS animation libraries
- ADR-3: Each component has its own `.css` file — import it inside the `.jsx`
- Tiles are `<button>` elements — keyboard accessible, correct semantics

**Dependencies**:
- Phase 1 complete (Vite scaffold + global CSS + questions.js)

---

## Tasks

Builds all five visual components. Tasks T2.1 and T2.2 are independent and can run in parallel. T2.3, T2.4, T2.5 can also run in parallel after T2.1 is complete (AnswerTile is used by QuestionCard).

---

- [ ] **T2.1 AnswerTile Component** `[activity: frontend-ui]` `[parallel: true]`

  1. **Prime**: Read `[ref: SDD/Component Responsibilities Table; lines: 122-131]` for props: `label`, `selected`, `correct`, `revealed`, `onClick`; read `[ref: SDD/Animation Spec; lines: 390-431]` for hover lift, pulse on selection, shake on wrong
  2. **Test**: Render `<AnswerTile label="Test option" selected={false} correct={false} revealed={false} onClick={() => {}} />` in a temporary dev render — verify a styled button appears with correct shape
  3. **Implement**:

     **`src/components/AnswerTile.jsx`**:
     ```jsx
     // Props: label, selected, correct, revealed, onClick
     // States: idle | selected (pre-reveal) | correct | wrong
     // When revealed=false and selected=false: idle
     // When revealed=false and selected=true: selected (highlight accent)
     // When revealed=true and correct=true: success green
     // When revealed=true and correct=false and selected=true: error red + shake
     ```

     **`src/components/AnswerTile.css`**:
     - Base tile: `border-radius: var(--radius-tile)`, `padding: 18px 24px`, `min-height: 64px`, full width, `background: var(--card)`, `border: 2px solid transparent`, `box-shadow: var(--shadow)`, `transition: all 150ms ease`
     - Hover (not revealed): `translateY(-2px)`, `box-shadow: var(--shadow-elevated)`, `border-color: var(--accent)`
     - `.selected` (pre-reveal): accent border + light accent background tint (`rgba(0,122,255,0.06)`)
     - `.correct` (revealed): `background: var(--success)`, white text, no border
     - `.wrong` (revealed + selected wrong): `background: var(--error)`, white text, apply `shake` keyframe
     - Shake keyframe: `@keyframes shake { 0%/100%: translateX(0); 20%/60%: translateX(-8px); 40%/80%: translateX(8px) }`, duration 400ms
     - Pulse keyframe on click: `@keyframes pulse { 0%/100%: scale(1); 50%: scale(1.02) }`, duration 200ms
     - When `revealed=true`: `pointer-events: none` on all tiles (prevent double-selection)

  4. **Validate**: In browser — hover lifts tile; clicking pulses; correct answer turns green; wrong turns red and shakes; pointer-events disabled after reveal
  5. **Success**:
     - [ ] Hover: tile lifts 2px, shows elevated shadow `[ref: SDD/Animation Spec; lines: 396-399]`
     - [ ] Click: scale pulse 1→1.02→1 over 200ms `[ref: SDD/Animation Spec; lines: 400-403]`
     - [ ] Correct reveal: green background, white text `[ref: SDD/Colors; lines: 367]`
     - [ ] Wrong reveal: red background + shake animation `[ref: SDD/Animation Spec; lines: 404-411]`
     - [ ] `pointer-events: none` when `revealed=true` `[ref: SDD/Error Handling; lines: 334]`

---

- [ ] **T2.2 FeedbackOverlay Component** `[activity: frontend-ui]` `[parallel: true]`

  1. **Prime**: Read `[ref: SDD/Component Responsibilities Table; lines: 122-131]` for props: `correct`, `visible`, `onDone`; read `[ref: SDD/Animation Spec; lines: 404-411]` for fade-in/out; read `[ref: SDD/Runtime View state transitions; lines: 266-278]` — auto-dismisses after 1200ms calling `onDone`
  2. **Test**: Render `<FeedbackOverlay correct={true} visible={true} onDone={() => console.log('done')} />` — verify green overlay with ✓ appears and auto-calls `onDone` after ~1200ms
  3. **Implement**:

     **`src/components/FeedbackOverlay.jsx`**:
     ```jsx
     // useEffect: when visible becomes true, set setTimeout(onDone, 1200)
     // Cleanup: clear timeout on unmount
     // Render: when visible, show full-screen overlay div
     // Icon: large ✓ (correct) or ✗ (wrong) with emoji alternative
     ```

     **`src/components/FeedbackOverlay.css`**:
     - Position: `fixed`, `inset: 0`, `z-index: 100`, `display: flex`, `align-items: center`, `justify-content: center`
     - Correct: `background: rgba(52, 199, 89, 0.92)` (success green, slightly transparent)
     - Wrong: `background: rgba(255, 59, 48, 0.92)` (error red)
     - Icon: `font-size: 80px`, white color
     - Fade-in animation: `@keyframes fadeIn { from: opacity 0, scale 0.8; to: opacity 1, scale 1 }`, duration 200ms, `ease-out`
     - When `!visible`: `display: none` (or conditional render in JSX)

  4. **Validate**: Overlay appears immediately on `visible=true`; shows correct icon; auto-calls `onDone` after 1200ms; disappears cleanly
  5. **Success**:
     - [ ] Correct: green overlay + ✓ icon fades in `[ref: SDD/Animation Spec; lines: 404-411]`
     - [ ] Wrong: red overlay + ✗ icon fades in `[ref: SDD/Animation Spec; lines: 404-411]`
     - [ ] `onDone()` fires after exactly 1200ms `[ref: SDD/State Transitions; lines: 266-278]`
     - [ ] No overlay render when `visible=false` (no layout shift) `[ref: SDD/Runtime View; lines: 287-299]`

---

- [ ] **T2.3 IntroScreen Component** `[activity: frontend-ui]` `[parallel: true]`

  1. **Prime**: Read `[ref: SDD/Component Responsibilities Table; lines: 122-131]` for callback: `onStart(name)`; read `[ref: SDD/Error Handling; lines: 333]` — Start button disabled when name empty; read `[ref: SDD/Animation Spec; lines: 392-396]` — screen fade-in transition
  2. **Test**: Render `<IntroScreen onStart={(n) => console.log(n)} />` — verify: name input present, Start button disabled when empty, enabled after typing, clicking calls `onStart` with the typed name
  3. **Implement**:

     **`src/components/IntroScreen.jsx`**:
     ```jsx
     // Local state: name (string)
     // Render:
     //   - App title: "AI Quiz" (large heading)
     //   - Subtitle: "Test your AI knowledge — and a cricket wildcard!"
     //   - Name input: placeholder "Enter your name"
     //   - Start button: disabled when name.trim().length === 0
     //   - onClick: calls onStart(name.trim())
     ```

     **`src/components/IntroScreen.css`**:
     - Container: `display: flex`, `flex-direction: column`, `align-items: center`, `justify-content: center`, `min-height: 100vh`, `gap: var(--gap)`
     - Card: `background: var(--card)`, `border-radius: var(--radius-card)`, `padding: var(--pad-card)`, `box-shadow: var(--shadow)`, `max-width: 480px`, `width: 100%`, `text-align: center`
     - Title: `font-size: 40px`, `font-weight: 700`, `letter-spacing: -0.5px`, `color: var(--text-primary)`
     - Subtitle: `color: var(--text-secondary)`, `font-size: 17px`
     - Input: `width: 100%`, `padding: 14px 18px`, `border-radius: var(--radius-button)`, `border: 2px solid #E5E5EA`, `font-size: 17px`, `outline: none`, focus: `border-color: var(--accent)`
     - Start button: `background: var(--accent)`, `color: white`, `border-radius: var(--radius-button)`, `padding: 16px 32px`, `font-size: 17px`, `font-weight: 600`, `width: 100%`, `transition: opacity 200ms, transform 150ms`
     - Button disabled: `opacity: 0.4`, `cursor: not-allowed`
     - Button enabled hover: `transform: translateY(-1px)`, `box-shadow: 0 4px 16px rgba(0,122,255,0.35)`
     - Entry animation: `.intro-card { animation: slideUp 400ms cubic-bezier(0.16,1,0.3,1) both }`; `@keyframes slideUp { from: opacity 0, translateY(20px); to: opacity 1, translateY(0) }`

  4. **Validate**: Card slides up on load; name input focuses; Start disabled with empty name; enabled and clickable after typing; calls `onStart` with trimmed name
  5. **Success**:
     - [ ] Start button disabled when `playerName.trim() === ''` `[ref: SDD/AC Usability; lines: 509]`
     - [ ] `onStart(name)` called with trimmed name on click `[ref: SDD/State Transitions; lines: 259-262]`
     - [ ] Slide-up entry animation plays on mount `[ref: SDD/Animation Spec; lines: 392-396]`
     - [ ] Apple aesthetic: white card on grey background, Inter font, SF Blue button `[ref: SDD/Design System; lines: 362-387]`

---

- [ ] **T2.4 QuestionCard Component** `[activity: frontend-ui]`

  > **Depends on T2.1** (AnswerTile must exist before QuestionCard imports it)

  1. **Prime**: Read `[ref: SDD/Component Responsibilities Table; lines: 122-131]` for props: `question`, `index`, `total`, `selectedIndex`, `revealed`, `onSelect`; read `[ref: SDD/Animation Spec; lines: 392-396, 427-430]` for progress bar and slide-up; read `[ref: SDD/AC Quiz Flow; lines: 496-499]` for progress indicator requirement
  2. **Test**: Render `<QuestionCard question={questions[0]} index={0} total={10} selectedIndex={null} revealed={false} onSelect={(i) => console.log(i)} />` — verify: question text, 4 answer tiles, progress bar at 10%
  3. **Implement**:

     **`src/components/QuestionCard.jsx`**:
     ```jsx
     // Render:
     //   - Progress bar: width = ((index + 1) / total * 100) + '%'
     //   - Question counter: "Q{index+1} of {total}" + cricket badge if category==='cricket'
     //   - Question emoji + text
     //   - 4 AnswerTile components, each with:
     //       selected={selectedIndex === i}
     //       correct={revealed && i === question.correctIndex}
     //       revealed={revealed}
     //       onClick={() => !revealed && onSelect(i)}
     ```

     **`src/components/QuestionCard.css`**:
     - Container: full-height centering (same as IntroScreen container)
     - Card: same card style as IntroScreen (`var(--card)`, `var(--radius-card)`, `var(--shadow)`, `max-width: 560px`)
     - Progress bar track: `height: 6px`, `border-radius: 3px`, `background: #E5E5EA`, `overflow: hidden`, margin-bottom `24px`
     - Progress fill: `height: 100%`, `background: var(--accent)`, `border-radius: 3px`, `transition: width 300ms ease`
     - Counter: `font-size: 13px`, `font-weight: 600`, `color: var(--text-secondary)`, `text-transform: uppercase`, `letter-spacing: 0.5px`
     - Cricket badge: inline `background: #FF9500` (Apple Orange), `color: white`, `border-radius: 6px`, `padding: 2px 8px`, `font-size: 11px`, `margin-left: 8px`
     - Question text: `font-size: 22px`, `font-weight: 600`, `line-height: 1.4`, `margin: 16px 0 24px`
     - Answer grid: `display: flex`, `flex-direction: column`, `gap: 12px`
     - Slide-up animation on mount: same `slideUp` keyframe as IntroScreen (define in global.css or repeat in this file)

  4. **Validate**: Progress bar animates from 10% to 20% when advancing Q1→Q2; cricket badge appears on Q10; tiles are selectable (call `onSelect`); tiles become non-interactive after `revealed=true`
  5. **Success**:
     - [ ] Progress bar shows `((index+1)/total * 100)%` width `[ref: SDD/AC Quiz Flow; lines: 496]`
     - [ ] Progress bar transitions smoothly on question advance `[ref: SDD/Animation Spec; lines: 427-430]`
     - [ ] Cricket badge visible on Q10 `[ref: SDD/AC Cricket; lines: 514]`
     - [ ] 4 AnswerTile components render and delegate to `onSelect` `[ref: SDD/Component Responsibilities; lines: 127]`
     - [ ] `onSelect` not called when `revealed=true` `[ref: SDD/Error Handling; lines: 334]`

---

- [ ] **T2.5 ResultsScreen Component** `[activity: frontend-ui]` `[parallel: true]`

  1. **Prime**: Read `[ref: SDD/Component Responsibilities Table; lines: 122-131]` for props: `score`, `total`, `answers`, `questions`, `playerName`, `onRestart`; read `[ref: SDD/Grade Badge Logic; lines: 443-450]`; read `[ref: SDD/Animation Spec — Score Counter; lines: 419-422]`; read `[ref: SDD/Confetti; lines: 423-426]`; read `[ref: SDD/AC Gamification; lines: 501-508]`
  2. **Test**: Render `<ResultsScreen score={8} total={10} answers={[...]} questions={questions} playerName="Arun" onRestart={() => {}} />` — verify: score counts up to 8, "Expert" badge shows, breakdown renders, no confetti for score 7; re-render with score=9 — confetti appears
  3. **Implement**:

     **`src/components/ResultsScreen.jsx`**:
     ```jsx
     // Score counter: useEffect + useState(displayScore=0)
     //   setInterval incrementing displayScore until it reaches `score`
     //   or: requestAnimationFrame-based count-up over 1500ms
     //
     // Grade: derive from score (10→Legend, >=8→Expert, >=6→Solid, <6→Keep Learning)
     //
     // Confetti: render 20 <span> elements when score >= 8
     //   Each span: fixed position, random left%, random animation-delay 0-1.5s
     //
     // Breakdown: questions.map((q, i) => row showing Q text, correct/wrong icon)
     //   answers[i] === q.correctIndex ? ✓ (green) : ✗ (red)
     //
     // Play Again button: calls onRestart()
     ```

     **`src/components/ResultsScreen.css`**:
     - Container: full-height centering
     - Card: `max-width: 600px`, same card styles
     - Score display: `font-size: 80px`, `font-weight: 700`, `color: var(--accent)`, `line-height: 1`, centered
     - Score label: `font-size: 17px`, `color: var(--text-secondary)` — "{displayScore} out of {total}"
     - Grade badge: `font-size: 32px` emoji + `font-size: 22px` label, `font-weight: 700`, centered
     - Breakdown table: `width: 100%`, each row: flex between question-mini-text and ✓/✗ icon, `font-size: 14px`
     - Correct row icon: `color: var(--success)`, `font-weight: 700`
     - Wrong row icon: `color: var(--error)`
     - Play Again button: same Apple button style as IntroScreen Start button
     - Confetti: `@keyframes confettiFall { from: translateY(-100px) rotate(0deg); to: translateY(100vh) rotate(720deg) }`, each span `position: fixed`, `top: -20px`, `width: 10px`, `height: 10px`, `border-radius: 2px`, varied colors (`#007AFF`, `#34C759`, `#FF9500`, `#FF3B30`, `#AF52DE`), `animation: confettiFall 3s forwards`, `pointer-events: none`, `z-index: 200`

  4. **Validate**: Score animates 0→final over ~1.5s; correct grade appears; confetti falls for score≥8 but not score≤7; breakdown shows correct ✓/✗ per question; Play Again fires `onRestart`
  5. **Success**:
     - [ ] Score counter animates 0→score over 1500ms `[ref: SDD/AC Gamification; lines: 501]`
     - [ ] Grade badge correct for all thresholds `[ref: SDD/Grade Badge Logic; lines: 443-450]`
     - [ ] Confetti renders when `score >= 8`, absent when `score < 8` `[ref: SDD/AC Gamification; lines: 503]`
     - [ ] Breakdown shows 10 rows, each with correct ✓ or ✗ `[ref: SDD/AC Gamification; lines: 504]`
     - [ ] `onRestart()` fires on Play Again click `[ref: SDD/AC Usability; lines: 511]`
     - [ ] Confetti `pointer-events: none` so Play Again is not blocked `[ref: SDD/Gotchas; lines: 523]`

---

- [ ] **T2.6 Phase 2 Validation** `[activity: validate]`

  - Visually test each component in isolation by temporarily importing and rendering it in `App.jsx`
  - Verify Apple aesthetic: white cards on `#F5F5F7` grey, Inter font, SF Blue accents
  - Verify all animations: AnswerTile hover/pulse/shake, FeedbackOverlay fade, IntroScreen/QuestionCard slide-up, ResultsScreen score count-up and confetti
  - Verify accessibility: tab through all buttons; all interactive elements reachable by keyboard
  - Run `npm run build` — verify no compilation errors
  - **Success**: All 5 components render correctly in isolation; animations play; build compiles clean — Phase 3 can begin
