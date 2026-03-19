import './QuestionCard.css'
import AnswerTile from './AnswerTile'

export default function QuestionCard({ question, index, total, selectedIndex, revealed, onSelect }) {
  const progress = ((index + 1) / total) * 100
  const isCricket = question.category === 'cricket'

  return (
    <div className="qcard-container screen">
      <div className="qcard">
        {/* Progress bar */}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Counter + badge */}
        <div className="qcard-meta">
          <span className="qcard-counter">Question {index + 1} of {total}</span>
          {isCricket && (
            <span className="cricket-badge">🏏 Cricket Wildcard</span>
          )}
        </div>

        {/* Question */}
        <div className="qcard-question">
          <span className="qcard-emoji" aria-hidden="true">{question.emoji}</span>
          <h2 className="qcard-text">
            {question.text.replace('🏏 Cricket Wildcard! ', '')}
          </h2>
        </div>

        {/* Answer tiles */}
        <div className="qcard-answers">
          {question.options.map((option, i) => (
            <AnswerTile
              key={i}
              label={option}
              selected={selectedIndex === i}
              correct={revealed && i === question.correctIndex}
              revealed={revealed}
              onClick={() => onSelect(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
