import { useEffect } from 'react'
import './FeedbackOverlay.css'

export default function FeedbackOverlay({ correct, visible, onDone }) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onDone, 1200)
    return () => clearTimeout(timer)
  }, [visible, onDone])

  if (!visible) return null

  return (
    <div className={`feedback-overlay ${correct ? 'correct' : 'wrong'}`}>
      <div className="feedback-icon">
        {correct ? '✓' : '✗'}
      </div>
      <div className="feedback-text">
        {correct ? 'Correct!' : 'Not quite!'}
      </div>
    </div>
  )
}
