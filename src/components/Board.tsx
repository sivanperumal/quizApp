import React, { useMemo } from "react";
import { Quiz } from "../interface";
import { useDispatch } from "react-redux";
import { updateAnswer, useQuiz } from "../redux/slices/quiz.slice";
interface BoardProps {
  data: Quiz;
  boardtype: string;
}
const Board: React.FC<BoardProps> = (props) => {
  const dispatch = useDispatch();
  const { data, boardtype } = props;
  const { selectedAnswers, resultPageNo } = useQuiz();
  const handleOnChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    // dispatch(updateAnswer({questionId: data.questionId, answer: event.target.checked ? value : ''}))
    dispatch(updateAnswer({ questionId: data.questionId, answer: value }));
  };

  const selectedValue: unknown = useMemo(() => {
    return selectedAnswers[data.questionId];
  }, [selectedAnswers, data.questionId]);

  return (
    <div className="board">
      <h2>Question {data.questionId + 1}</h2>
      <p>{data.question}</p>
      <ul className="answers">
        {data.answers?.map((answer, index: number) => (
          <li
            className={`answer-item ${
              selectedAnswers[resultPageNo] === answer &&
              answer === data.correct_answer &&
              boardtype === "rBoard"
                ? "correct selected"
                : selectedAnswers[resultPageNo] === answer &&
                  answer !== data.correct_answer &&
                  boardtype === "rBoard"
                ? "wrong"
                : selectedAnswers[resultPageNo] !== answer &&
                  answer === data.correct_answer &&
                  boardtype === "rBoard"
                ? "correct"
                : ""
            }`}
          >
            {boardtype === "qBoard" && (
              <input
                type="radio"
                checked={selectedValue === answer}
                id={`option${index}`}
                onChange={(event) => handleOnChange(event, answer)}
              />
            )}
            {selectedAnswers[resultPageNo] === answer &&
            answer === data.correct_answer &&
            boardtype === "rBoard" ? (
              <i className="fa fa-check"></i>
            ) : selectedAnswers[resultPageNo] === answer &&
              answer !== data.correct_answer &&
              boardtype === "rBoard" ? (
              <i className="fa fa-times"></i>
            ) : (
              ""
            )}
            <label htmlFor={`option${index}`}>{answer}</label>
            <span className="answercomment">
              {`${
                selectedAnswers[resultPageNo] === answer &&
                answer === data.correct_answer &&
                boardtype === "rBoard"
                  ? "Your answer"
                  : selectedAnswers[resultPageNo] === answer &&
                    answer !== data.correct_answer &&
                    boardtype === "rBoard"
                  ? "Your answer"
                  : selectedAnswers[resultPageNo] !== answer &&
                    answer === data.correct_answer &&
                    boardtype === "rBoard"
                  ? "Correct answer"
                  : ""
              }`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
