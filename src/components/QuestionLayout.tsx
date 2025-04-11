import { Quiz } from "../interface";
import ActionBtns from "./ActionBtns";
import Question from "./Question";

interface QuestionInterface {
    data: Quiz
}

const QuestionLayout: React.FC<QuestionInterface> = (props) => {

    const { data } = props;

    return (
        <div>
            <Question data={data} />
            <ActionBtns />
        </div>
    )
}

export default QuestionLayout;