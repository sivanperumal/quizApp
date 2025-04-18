import React from "react";
import {
  getQuiz,
  resetQuiz,
  updatePageNo,
  useQuiz,
} from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const Scores: React.FC = (props) => {
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
  const result = percentage > 70 ? "pass" : "fail";

  const handleCancel = () => {
    onCloseModal();
    dispatch(getQuiz());
    dispatch(resetQuiz());
    dispatch(updatePageNo(0));
  };
  return (
    <>
      <h1>
        {`You gained ${score}/${quiz.length} score. Precentage: ${percentage},
      result will be ${result}`}
      </h1>
      <button onClick={handleCancel}>Cancel</button>
    </>
  );
};

export default Scores;
