import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getQuiz, resetQuiz, useQuiz } from "./redux/slices/quiz.slice";
import QuestionLayout from "./components/QuestionLayout";
import { AppDispatch } from "./redux/store";

function App() {
  const { quizStarted } = useQuiz();
  const dispatch = useDispatch<AppDispatch>();

  const { pageNo, quiz } = useQuiz();

  useEffect(() => {
    dispatch(getQuiz());
  }, [dispatch]);

  const questionObj = useMemo(() => {
    return quiz[pageNo] ?? {};
  }, [pageNo, quiz]);
  const handleQuizStart = () => {
    dispatch(resetQuiz());
  };
  return (
    <div className="App">
      <h1>Quiz App</h1>
      {quizStarted ? (
        <QuestionLayout data={questionObj} />
      ) : (
        <button onClick={() => handleQuizStart()}>Start the Quiz</button>
      )}
    </div>
  );
}

export default App;
