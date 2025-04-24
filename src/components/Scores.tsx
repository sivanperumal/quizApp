import React from "react";
import {
  getQuiz,
  resetQuiz,
  retryQuiz,
  useQuiz,
} from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

type Result = 'pass' | 'fail';

interface ScroeProps {
  onCloseModal: () => void
}

const Scores: React.FC<ScroeProps> = (props) => {
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
  const result:Result = percentage > 70 ? "pass" : "fail";

  const handleCancel = () => {
    onCloseModal();
    dispatch(resetQuiz())
    dispatch(getQuiz());
  };

  const handleRetry = () => {
    dispatch(retryQuiz());
    onCloseModal();
  }

  return (
    <>
      <h1>
        {`You gained ${score}/${quiz.length} score. Precentage: ${percentage},
      result will be ${result}`}
      </h1>
      <button onClick={handleCancel}>Close</button>
      {result === 'fail' && <button onClick={handleRetry}>Retry</button>}
    </>
  );
};

export default Scores;
