import React, { Suspense, useEffect, useMemo } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getQuiz, retryQuiz, useQuiz } from "./redux/slices/quiz.slice";
import { AppDispatch } from "./redux/store";

// Lazy load
const QuestionLayout = React.lazy(() => import("./components/QuestionLayout"));
const Results = React.lazy(() => import("./components/Results"));

function App() {
  const { quizStarted, resultStarted } = useQuiz();
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
    <div className="App p-0">
      <div className="app-container container">
        <header>
          <h1>Quiz App {`${resultStarted ? "Results" : ""}`}</h1>
        </header>

        {quizStarted ? (
          <Suspense fallback={<div>Loading...</div>}>
            <QuestionLayout data={questionObj} />
          </Suspense>
        ) : (
          !resultStarted && (
            <button
              className="btn btn-success"
              onClick={() => handleQuizStart()}
            >
              Start the Quiz
            </button>
          )
        )}
        {resultStarted && (
          <Suspense fallback={<div>Loading...</div>}>
            <Results />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
