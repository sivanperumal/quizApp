import { useMemo } from "react";
import { Quiz } from "../interface";
import { updateAnswer, useQuiz } from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";

interface QuestionInterface {
  data: Quiz;
}

const Question: React.FC<QuestionInterface> = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const { selectedAnswers } = useQuiz();

  const handleOnChange = (value: string) => {
    // dispatch(updateAnswer({questionId: data.questionId, answer: event.target.checked ? value : ''}))
    dispatch(updateAnswer({ questionId: data.questionId, answer: value }));
  };

  const selectedValue: unknown = useMemo(() => {
    return selectedAnswers[data.questionId];
  }, [selectedAnswers, data.questionId]);

  return (
    <div>
      <h2>{data.question}</h2>
      <ul>
        {data.options?.map((option, index) => (
          <li>
            <input
              type="radio"
              checked={selectedValue === option}
              id={`option${index}`}
              onChange={() => handleOnChange(option)}
            />
            <label htmlFor={`option${index}`}>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
