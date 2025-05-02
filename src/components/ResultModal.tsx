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
interface ResultProps {
  open: boolean;
  onCloseResultsModal: () => void;
}
const ResultModal: React.FC<ResultProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { open, onCloseResultsModal } = props;
  const { quiz, resultPageNo, selectedAnswers } = useQuiz();
  const questionObj: Quiz = useMemo(() => {
    return quiz[resultPageNo] ?? {};
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
    onCloseResultsModal();
  };
  return (
    <div className="resultboard" style={{ display: open ? "block" : "none" }}>
      <div className="resultboard-dialogue">
        <h2>Question{resultPageNo + 1}</h2>
        <p>{questionObj.question}</p>
        <ul className="answers">
          {questionObj?.answers.map((answer: string) => {
            return (
              <li
                key={answer}
                className={`answer-item ${
                  selectedAnswers[resultPageNo] === answer &&
                  answer === questionObj.correct_answer
                    ? "correct selected"
                    : selectedAnswers[resultPageNo] === answer &&
                        answer !== questionObj.correct_answer
                      ? "wrong"
                      : selectedAnswers[resultPageNo] !== answer &&
                          answer === questionObj.correct_answer
                        ? "correct"
                        : ""
                }`}
              >
                {selectedAnswers[resultPageNo] === answer &&
                answer === questionObj.correct_answer ? (
                  <i className="fa fa-check"></i>
                ) : selectedAnswers[resultPageNo] === answer &&
                  answer !== questionObj.correct_answer ? (
                  <i className="fa fa-times"></i>
                ) : (
                  ""
                )}
                {answer}
                <span className="answercomment">
                  {`${
                    selectedAnswers[resultPageNo] === answer &&
                    answer === questionObj.correct_answer
                      ? "Your answer"
                      : selectedAnswers[resultPageNo] === answer &&
                          answer !== questionObj.correct_answer
                        ? "Your answer"
                        : selectedAnswers[resultPageNo] !== answer &&
                            answer === questionObj.correct_answer
                          ? "Correct answer"
                          : ""
                  }`}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="resultActions">
          <button
            onClick={handlePrevQuiz}
            disabled={resultPageNo === 0 ? true : false}
          >{`< Previous`}</button>
          {resultPageNo >= quiz.length - 1 ? (
            <button onClick={handleOnReset}>Close</button>
          ) : (
            <button onClick={handleNextQuiz}>{`Next >`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
