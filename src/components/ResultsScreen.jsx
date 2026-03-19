import { useState, useEffect } from 'react'
import './ResultsScreen.css'

const getGrade = (score, total) => {
  if (score === total) return { emoji: '🏆', label: 'Legend', color: '#FFD700' }
  if (score >= 8) return { emoji: '⭐', label: 'Expert', color: '#007AFF' }
  if (score >= 6) return { emoji: '🎯', label: 'Solid', color: '#34C759' }
  return { emoji: '📚', label: 'Keep Learning', color: '#FF9500' }
}

export default function ResultsScreen({ score, total, answers, questions, playerName, onRestart }) {
  const [displayScore, setDisplayScore] = useState(0)
  const grade = getGrade(score, total)
  const showConfetti = score >= 8

  useEffect(() => {
    // Animate score counter from 0 to score over 1500ms
    if (score === 0) return
    const duration = 1500
    const steps = score
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += 1
      setDisplayScore(current)
      if (current >= score) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [score])

  return (
    <div className="results-container screen">
      {showConfetti && (
        <div className="confetti-container" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="confetti-piece" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1.5}s`,
              background: ['#007AFF','#34C759','#FF9500','#FF3B30','#AF52DE','#FFD700'][i % 6]
            }} />
          ))}
        </div>
      )}

      <div className="results-card">
        <p className="results-greeting">Well done, {playerName}!</p>

        <div className="results-score-wrap">
          <div className="results-score">{displayScore}</div>
          <div className="results-total">out of {total}</div>
        </div>

        <div className="results-grade">
          <span className="grade-emoji">{grade.emoji}</span>
          <span className="grade-label" style={{ color: grade.color }}>{grade.label}</span>
        </div>

        <div className="results-breakdown">
          <h3 className="breakdown-title">Question Breakdown</h3>
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.correctIndex
            return (
              <div key={q.id} className={`breakdown-row ${isCorrect ? 'correct' : 'wrong'}`}>
                <span className="breakdown-num">Q{i + 1}</span>
                <span className="breakdown-text">{q.text.replace('🏏 Cricket Wildcard! ', '')}</span>
                <span className="breakdown-icon">{isCorrect ? '✓' : '✗'}</span>
              </div>
            )
          })}
        </div>

        <button className="results-btn" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  )
}
