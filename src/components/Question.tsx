import { Quiz } from "../interface";

import Board from "./BoardComp";

interface QuestionProps {
  data: Quiz;
}

const Question: React.FC<QuestionProps> = (props) => {
  const { data } = props;

  return (
    <>
      <Board data={data} boardtype="qBoard" />
    </>
  );
};

export default Question;
