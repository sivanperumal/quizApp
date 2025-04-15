import { Quiz } from "../interface";
import ActionBtns from "./ActionBtns";
import Preview from "./Preview";
import Question from "./Question";

interface QuestionInterface {
    data: Quiz
}

const QuestionLayout: React.FC<QuestionInterface> = (props) => {

    const { data } = props;

    return (
        <div className="question-layout">
            <div className="question-container">
                <Question data={data} />
                <ActionBtns />
            </div>
            <Preview />
        </div>
    )
}

export default QuestionLayout;