import React, { Suspense, useEffect, useMemo } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getQuiz, retryQuiz, useQuiz } from "./redux/slices/quiz.slice";
import { AppDispatch } from "./redux/store";

const QuestionLayout = React.lazy(() => import('./components/QuestionLayout'))

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
    dispatch(retryQuiz());
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {quizStarted ? (
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionLayout data={questionObj} />
        </Suspense>
      ) : (
        <button onClick={() => handleQuizStart()}>Start the Quiz</button>
      )}
    </div>
  );
}

export default App;
