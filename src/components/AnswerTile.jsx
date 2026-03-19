import './AnswerTile.css'

export default function AnswerTile({ label, selected, correct, revealed, onClick }) {
  const classes = ['answer-tile']
  if (revealed) {
    classes.push('revealed')
    if (correct) classes.push('correct')
    else if (selected) classes.push('wrong')
  } else if (selected) {
    classes.push('selected')
  }

  return (
    <button
      className={classes.join(' ')}
      onClick={!revealed ? onClick : undefined}
      disabled={revealed}
    >
      <span className="tile-label">{label}</span>
      {revealed && correct && <span className="tile-icon">✓</span>}
      {revealed && !correct && selected && <span className="tile-icon">✗</span>}
    </button>
  )
}
