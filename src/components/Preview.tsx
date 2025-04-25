import React from "react";
import { updatePageNo, useQuiz } from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";

const Preview: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedAnswers, quiz } = useQuiz();

  const handleClick = (index: number) => {
    dispatch(updatePageNo(index));
  };

  return (
    <div className="indicators">
      {quiz.map((_quiz, index) => {
        return (
          <button
            type="button"
            className={`${
              selectedAnswers[index] ? "active indicator" : "indicator"
            } btn btn-light`}
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Preview;
