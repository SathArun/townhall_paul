import { useState } from 'react'
import './App.css'
import questions from './data/questions'
import IntroScreen from './components/IntroScreen'
import QuestionCard from './components/QuestionCard'
import FeedbackOverlay from './components/FeedbackOverlay'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [playerName, setPlayerName] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)

  const onStart = (name) => {
    setPlayerName(name)
    setCurrentIndex(0)
    setSelectedIndex(null)
    setRevealed(false)
    setAnswers([])
    setScore(0)
    setScreen('question')
  }

  const onSelect = (optionIndex) => {
    if (revealed) return
    setAnswers(prev => [...prev, optionIndex])
    setSelectedIndex(optionIndex)
    setRevealed(true)
  }

  const onDone = () => {
    setRevealed(false)
    setSelectedIndex(null)
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      // Use functional update to read the fully updated answers array
      // (avoids stale closure — answers already includes the last selection)
      setAnswers(prev => {
        const finalScore = prev.filter((a, i) => a === questions[i].correctIndex).length
        setScore(finalScore)
        setScreen('result')
        return prev
      })
    }
  }

  const onRestart = () => {
    setScreen('intro')
    setPlayerName('')
    setCurrentIndex(0)
    setSelectedIndex(null)
    setRevealed(false)
    setAnswers([])
    setScore(0)
  }

  if (screen === 'intro') {
    return <IntroScreen onStart={onStart} />
  }

  if (screen === 'question') {
    return (
      <>
        <QuestionCard
          question={questions[currentIndex]}
          index={currentIndex}
          total={questions.length}
          selectedIndex={selectedIndex}
          revealed={revealed}
          onSelect={onSelect}
        />
        <FeedbackOverlay
          correct={selectedIndex !== null && selectedIndex === questions[currentIndex].correctIndex}
          visible={revealed}
          onDone={onDone}
        />
      </>
    )
  }

  if (screen === 'result') {
    return (
      <ResultsScreen
        score={score}
        total={questions.length}
        answers={answers}
        questions={questions}
        playerName={playerName}
        onRestart={onRestart}
      />
    )
  }
}
