import { useMemo } from "react";
import { Quiz } from "../interface";
import { updateAnswer, useQuiz } from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";
import { shuffleArray } from "../utils/";
interface QuestionInterface {
  data: Quiz;
}

const Question: React.FC<QuestionInterface> = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const { selectedAnswers } = useQuiz();
  const toRange = (n: number) => [...Array(n).keys()];
  const shuffleIndex = shuffleArray(toRange(data.options.length));

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
        {shuffleIndex?.map((index: number) => (
          <li>
            <input
              type="radio"
              checked={selectedValue === data.options[index]}
              id={`option${index}`}
              onChange={(event) => handleOnChange(event, data.options[index])}
            />
            <label htmlFor={`option${index}`}>{data.options[index]}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
