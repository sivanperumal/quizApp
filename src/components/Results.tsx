import React, { useMemo } from "react";
import {
  getQuiz,
  resetQuiz,
  updateResultPageNo,
  useQuiz,
} from "../redux/slices/quiz.slice";
import { Quiz } from "../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import Board from "./BoardComp";
const Results: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { quiz, resultPageNo } = useQuiz();

  const questionObj: Quiz = useMemo(() => {
    return quiz[resultPageNo];
  }, [resultPageNo, quiz]);

  const handlePrevQuiz = () => {
    dispatch(updateResultPageNo(resultPageNo - 1));
  };

  const handleNextQuiz = () => {
    dispatch(updateResultPageNo(resultPageNo + 1));
  };

  const handleOnReset = () => {
    dispatch(resetQuiz());
    dispatch(getQuiz());
  };

  return (
    <>
      <div className="question-layout">
        <div className="question-container">
          <Board data={questionObj} boardtype="rBoard" />
          <div className="resultActions">
            <button
              data-testid="prev-btn"
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={handlePrevQuiz}
              disabled={resultPageNo === 0 ? true : false}
            >{`< Previous`}</button>
            {resultPageNo >= quiz.length - 1 ? (
              <button
                data-testid="close-btn"
                type="button"
                className="btn btn-danger"
                onClick={handleOnReset}
              >
                Close
              </button>
            ) : (
              <button
                data-testid="next-btn"
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleNextQuiz}
              >{`Next >`}</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
