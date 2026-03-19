import { useState } from 'react'
import './IntroScreen.css'

export default function IntroScreen({ onStart }) {
  const [name, setName] = useState('')
  const canStart = name.trim().length > 0

  const handleStart = () => {
    if (canStart) onStart(name.trim())
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && canStart) handleStart()
  }

  return (
    <div className="intro-container screen">
      <div className="intro-card">
        <div className="intro-emoji">🎯</div>
        <h1 className="intro-title">AI Quiz</h1>
        <p className="intro-subtitle">
          Test your AI knowledge — with a surprise cricket wildcard at the end!
        </p>
        <div className="intro-form">
          <input
            className="intro-input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            maxLength={30}
          />
          <button
            className={`intro-btn ${canStart ? 'active' : ''}`}
            onClick={handleStart}
            disabled={!canStart}
          >
            Start Quiz →
          </button>
        </div>
        <p className="intro-meta">10 questions · AI + Cricket 🏏</p>
      </div>
    </div>
  )
}
