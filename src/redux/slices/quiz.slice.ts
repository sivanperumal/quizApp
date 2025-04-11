import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { QuizState } from "../../interface";

export const getQuiz = createAsyncThunk('quiz/getQuiz', async ()=> {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=30&category=18&difficulty=easy')
        const data = await response.json()
        return data.results
    } catch (error) {
        console.log(error)
    }
});

const initialState: QuizState = {
    quiz: [],   
    selectedAnswers: [],
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        updateAnswer: (state, action) => {
            const { questionId, answer } = action.payload;
            state.selectedAnswers[questionId] = answer;
        }
    },
    extraReducers: builder => {
        builder.addCase(getQuiz.fulfilled, (state, action) => {
            state.quiz = action.payload
        })
        builder.addCase(getQuiz.pending, (state) => {
            state.quiz = []
        })
        builder.addCase(getQuiz.rejected, (state) => {
            state.quiz = []
        })
    }
})

export const { updateAnswer } = quizSlice.actions;

export default quizSlice.reducer;