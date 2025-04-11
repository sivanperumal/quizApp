import React from "react"
import { updatePageNo, useQuiz } from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";

const ActionBtns: React.FC = () => {
    const { pageNo } = useQuiz();
    const dispatch = useDispatch();

    const handlePrev = () => {
        dispatch(updatePageNo(pageNo - 1))
    }

    const handleNext = () => {
        dispatch(updatePageNo(pageNo + 1))
    }

    const handleSubmit = () => {
        alert('exam done')
    }

    return (
        <div className="action-btns">
            <button onClick={handlePrev} disabled={pageNo===0}>Prev</button>
            {
                pageNo > 28 ? 
                <button onClick={handleSubmit}>Submit</button> :
                <button onClick={handleNext}>Next</button>
            }
        </div>
    )
}

export default ActionBtns;