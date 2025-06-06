import React from "react";
import { updatePageNo, useQuiz } from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";

export interface ActionbtnInerface {
  onOpenModal: () => void;
}
const ActionBtns: React.FC<ActionbtnInerface> = (props) => {
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
      <button
        type="button"
        className="btn btn-outline-secondary me-2"
        onClick={handlePrev}
        data-testid="prev-btn"
        disabled={pageNo === 0}
      >
        Prev
      </button>
      {pageNo >= quiz.length - 1 ? (
        <button
          className="btn btn-success"
          onClick={handleSubmit}
          data-testid="submit-btn"
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-testid="next-btn"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default ActionBtns;
