import React from "react"
import { updatePageNo, useQuiz } from "../redux/slices/quiz.slice";
import { useDispatch } from "react-redux";

const ActionBtns: React.FC = () => {
    const { pageNo, quiz, selectedAnswers } = useQuiz();
    const dispatch = useDispatch();

    const handlePrev = () => {
        dispatch(updatePageNo(pageNo - 1))
    }

    const handleNext = () => {
        dispatch(updatePageNo(pageNo + 1))
    }

    const handleSubmit = () => {
        if(selectedAnswers.filter(el => el).length === quiz.length) {
            let score = 0;
            selectedAnswers.forEach((answer, index) => {
                const correct_answer = quiz[index].correct_answer;
                if(correct_answer === answer) {
                    score = score + 1;
                }
            })
            const percentage = (score / quiz.length) * 100;
            const result = percentage > 70 ? 'pass' : 'fail';
            alert(`You gained ${score}/${quiz.length} score. Precentage: ${percentage}, result will be ${result}`)
        } else {
            alert('please complete all the questions')
        }
    }

    return (
        <div className="action-btns">
            <button onClick={handlePrev} disabled={pageNo===0}>Prev</button>
            {
                pageNo >= quiz.length - 1 ? 
                <button onClick={handleSubmit}>Submit</button> :
                <button onClick={handleNext}>Next</button>
            }
        </div>
    )
}

export default ActionBtns;