import { useState } from "react";
import { Quiz } from "../interface";
import ActionBtns from "./ActionBtns";
import Preview from "./Preview";
import Question from "./Question";
import ScoreboardModal from "./ScoreboardModal";
import Scores from "./Scores";
import ResultModal from "./ResultModal";
interface QuestionLayoutProps {
  data: Quiz;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = (props) => {
  const { data } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [openResult, setOpenResult] = useState<boolean>(false);
  const handleOpenModal = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleResults = () => {
    setOpenResult(!openResult);
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

      <ResultModal open={openResult} onCloseResultsModal={handleResults} />
    </>
  );
};

export default QuestionLayout;
