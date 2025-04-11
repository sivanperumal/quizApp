import { useState } from 'react'
import './App.css'

function App() {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  
  return (
    <div className="App">
      <h1>Quiz App</h1>
      {
        quizStarted ? (
          <h4>questions will come</h4>
        ) : (
          <button onClick={() => setQuizStarted(true)}>Start the Quiz</button>
        )
      }
    </div>
  )
}

export default App
