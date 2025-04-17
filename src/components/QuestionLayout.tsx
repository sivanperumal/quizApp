import { useState } from "react";
import { Quiz } from "../interface";
import ActionBtns from "./ActionBtns";
import Preview from "./Preview";
import Question from "./Question";
import ScoreboardModal from "./ScoreboardModal";
import Scores from "./Scores";

interface QuestionInterface {
  data: Quiz;
}

const QuestionLayout: React.FC<QuestionInterface> = (props) => {
  const { data } = props;
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="question-layout">
        <div className="question-container">
          <Question data={data} />
          <ActionBtns onOpenModal={() => handleOpenModal()} />
        </div>
        <Preview />
      </div>
      <ScoreboardModal open={open}>
        <Scores onCloseModal={handleClose} />
      </ScoreboardModal>
    </>
  );
};

export default QuestionLayout;
