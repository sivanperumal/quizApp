import React from "react";
import { updatePageNo, useQuiz } from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";

const ActionBtns: React.FC = (props) => {
  const { onOpenModal } = props;
  const { pageNo, quiz, selectedAnswers } = useQuiz();
  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(updatePageNo(pageNo - 1));
  };

  const handleNext = () => {
    dispatch(updatePageNo(pageNo + 1));
  };

  const handleSubmit = () => {
    if (selectedAnswers.filter((el) => el).length === quiz.length) {
      onOpenModal();
    } else {
      alert("please complete all the questions");
    }
  };

  return (
    <div className="action-btns">
      <button onClick={handlePrev} disabled={pageNo === 0}>
        Prev
      </button>
      {pageNo >= quiz.length - 1 ? (
        <button onClick={handleSubmit}>Submit</button>
      ) : (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
};

export default ActionBtns;
