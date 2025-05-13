import React from "react";
import {
  getQuiz,
  resetQuiz,
  retryQuiz,
  updateResults,
  useQuiz,
} from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

type Result = "pass" | "fail";
export interface ScoreProps {
  onCloseModal: () => void;
}
const Scores: React.FC<ScoreProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { quiz, selectedAnswers } = useQuiz();
  const { onCloseModal } = props;
  let score = 0;
  selectedAnswers.forEach((answer, index) => {
    const correct_answer = quiz[index].correct_answer;
    if (correct_answer === answer) {
      score = score + 1;
    }
  });

  const percentage = (score / quiz.length) * 100;
  const result: Result = percentage > 70 ? "pass" : "fail";

  const handleCancel = () => {
    dispatch(resetQuiz());
    dispatch(getQuiz());
    onCloseModal();
  };

  const handleRetry = () => {
    dispatch(retryQuiz());
    onCloseModal();
  };
  const handleShowResults = () => {
    onCloseModal();
    dispatch(updateResults());
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="card p-3">
          <h5 className="mt-3 mb-3">Performance score</h5>

          <div className="border p-2 rounded d-flex flex-row align-items-center">
            <div
              className={`p-1 px-4 d-flex flex-column align-items-center rounded ${
                result === "pass" ? "alert alert-success" : "alert alert-danger"
              }`}
            >
              <span
                className={`d-block char ${
                  result === "pass" ? "text-success" : "text-danger"
                }`}
              >{`${result === "pass" ? "Pass" : "Fail"}`}</span>
              <span
                className={`${
                  result === "pass" ? "text-success" : "text-danger"
                }`}
              >
                {percentage}%
              </span>
            </div>

            <div className="ml-2 p-3">
              <h6 className="heading1">
                You gained {score}/{quiz.length}
              </h6>
              <span>
                The average exam score is {percentage}%, result will be {result}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        {selectedAnswers.filter((el) => el).length === quiz.length && (
          <button
            onClick={handleShowResults}
            type="button"
            className="btn btn-primary me-2"
          >
            Show Results
          </button>
        )}
        {result === "fail" && (
          <button
            onClick={handleRetry}
            type="button"
            className="btn btn-outline-secondary me-2"
          >
            Retry
          </button>
        )}
        <button
          onClick={handleCancel}
          type="button"
          className="btn btn-outline-secondary"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default Scores;
