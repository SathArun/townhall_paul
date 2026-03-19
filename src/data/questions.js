const questions = [
  {
    id: 1, category: 'ai', difficulty: 'easy', emoji: '🤖',
    text: 'What does "GPT" stand for?',
    options: ['Giant Processing Tool', 'Generative Pre-trained Transformer', 'Global Pattern Trainer', 'Graphic Processing Technology'],
    correctIndex: 1
  },
  {
    id: 2, category: 'ai', difficulty: 'easy', emoji: '🏢',
    text: 'Which company created ChatGPT?',
    options: ['Google', 'Meta', 'OpenAI', 'Microsoft'],
    correctIndex: 2
  },
  {
    id: 3, category: 'ai', difficulty: 'medium', emoji: '⚙️',
    text: 'What architecture powers modern large language models?',
    options: ['LSTM', 'CNN', 'Transformer', 'Recurrent Networks'],
    correctIndex: 2
  },
  {
    id: 4, category: 'ai', difficulty: 'medium', emoji: '💭',
    text: 'What is "hallucination" in AI?',
    options: ['An AI dreaming', 'When AI generates false but confident information', 'A rendering glitch', 'An overheating issue'],
    correctIndex: 1
  },
  {
    id: 5, category: 'ai', difficulty: 'medium', emoji: '📚',
    text: 'What does RAG stand for?',
    options: ['Rapid AI Generation', 'Retrieval-Augmented Generation', 'Random Algorithmic Guessing', 'Recurrent Attention Graph'],
    correctIndex: 1
  },
  {
    id: 6, category: 'ai', difficulty: 'easy', emoji: '💬',
    text: 'What is a "prompt" in AI?',
    options: ['A stage cue', 'A memory address', 'The input text you give to an AI model', 'A training dataset'],
    correctIndex: 2
  },
  {
    id: 7, category: 'ai', difficulty: 'medium', emoji: '🔧',
    text: 'What is fine-tuning an AI model?',
    options: ['Adjusting screen brightness', 'Further training on specific data to specialise the model', 'Deleting bad outputs', 'Compressing model weights'],
    correctIndex: 1
  },
  {
    id: 8, category: 'ai', difficulty: 'medium', emoji: '🔍',
    text: 'Which of these is NOT an AI language model?',
    options: ['Claude', 'GPT-4', 'Gemini', 'Hadoop'],
    correctIndex: 3
  },
  {
    id: 9, category: 'ai', difficulty: 'medium', emoji: '🎭',
    text: 'What does "multimodal" mean in AI?',
    options: ['Having multiple personalities', 'Using many servers', 'Processing multiple types of input (text, image, audio)', 'Running on multiple GPUs'],
    correctIndex: 2
  },
  {
    id: 10, category: 'cricket', difficulty: 'hard', emoji: '🏏',
    text: '🏏 Cricket Wildcard! Which Indian batsman holds the world record for most international centuries — and how many?',
    options: ['Sourav Ganguly — 38', 'Virat Kohli — 80', 'Sachin Tendulkar — 100', 'Rohit Sharma — 55'],
    correctIndex: 2
  }
]

export default questions
