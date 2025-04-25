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

  const isCorrectAns = (answer: string) => {
    return (
      selectedAnswers[resultPageNo] === answer &&
      answer === data.correct_answer &&
      boardtype === "rBoard"
    );
  };
  const isWrongAns = (answer: string) => {
    return (
      selectedAnswers[resultPageNo] === answer &&
      answer !== data.correct_answer &&
      boardtype === "rBoard"
    );
  };
  const isActualAns = (answer: string) => {
    return (
      selectedAnswers[resultPageNo] !== answer &&
      answer === data.correct_answer &&
      boardtype === "rBoard"
    );
  };
  const getClassName = (answer: string) => {
    let classLists = "";
    if (isCorrectAns(answer)) {
      classLists = "correct selected";
    } else if (isWrongAns(answer)) {
      classLists = "wrong";
    } else if (isActualAns(answer)) {
      classLists = "correct";
    } else {
      classLists = "";
    }
    return classLists;
  };

  const getSelectedAnsString = (answer: string) => {
    let catchString = "";
    if (isCorrectAns(answer)) {
      catchString = "Your Answer";
    } else if (isWrongAns(answer)) {
      catchString = "Your Answer";
    } else if (isActualAns(answer)) {
      catchString = "Correct answer";
    }
    return catchString;
  };
  return (
    <div className="board">
      <h2>Question {data.questionId + 1}</h2>
      <p>{data.question}</p>
      <ul className="answers">
        {data.answers?.map((answer, index: number) => (
          <li className={`answer-item ${getClassName(answer)}`}>
            {boardtype === "qBoard" && (
              <input
                type="radio"
                checked={selectedValue === answer}
                id={`option${index}`}
                onChange={(event) => handleOnChange(event, answer)}
              />
            )}
            {isCorrectAns(answer) ? (
              <i className="fa fa-check"></i>
            ) : isWrongAns(answer) ? (
              <i className="fa fa-times"></i>
            ) : (
              ""
            )}
            <label htmlFor={`option${index}`}>{answer}</label>
            <span className="answercomment">
              {`${getSelectedAnsString(answer)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
