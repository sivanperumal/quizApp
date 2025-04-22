import { useMemo } from "react";
import { Quiz } from "../interface";
import { updateAnswer, useQuiz } from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";
interface QuestionProps {
  data: Quiz;
}

const Question: React.FC<QuestionProps> = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const { selectedAnswers } = useQuiz();

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
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
        {data.answers?.map((answer, index: number) => (
          <li>
            <input
              type="radio"
              checked={selectedValue === answer}
              id={`option${index}`}
              onChange={(event) => handleOnChange(event, answer)}
            />
            <label htmlFor={`option${index}`}>{answer}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
