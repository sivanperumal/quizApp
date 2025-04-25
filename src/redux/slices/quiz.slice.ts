import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Quiz, QuizState } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { shuffleArray } from "../../utils";
const apiUrl = process.env.REACT_APP_API_URL;

export const getQuiz = createAsyncThunk("quiz/getQuiz", async () => {
  try {
    const response = await fetch(
      `${apiUrl}?amount=5&category=18&difficulty=easy`
    );
    const data = await response.json();
    return data.results?.map((el: Quiz) => ({
      ...el,
      options: [...el.incorrect_answers, el.correct_answer],
    }));
  } catch (error) {
    console.log(error);
  }
});

const initialState: QuizState = {
  quiz: [],
  selectedAnswers: [],
  pageNo: 0,
  quizStarted: false,
  resultStarted: false,
  resultPageNo: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.selectedAnswers[questionId] = answer;
    },
    retryQuiz: (state) => {
      state.selectedAnswers = [];
      state.quizStarted = true;
      state.pageNo = 0;
    },
    updatePageNo: (state, action) => {
      state.pageNo = action.payload;
    },
    resetQuiz: (state) => {
      state.selectedAnswers = [];
      state.quizStarted = false;
      state.resultStarted = false;
      state.pageNo = 0;
      state.resultPageNo = 0;
    },
    updateResults: (state) => {
      state.quizStarted = false;
      state.resultStarted = true;
    },
    updateResultPageNo: (state, action) => {
      state.resultPageNo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuiz.fulfilled, (state, action) => {
      const toRange = (n: number) => [...Array(n).keys()];
      const shuffleIndex = shuffleArray(toRange(action.payload.length));
      const questions = shuffleIndex.map((i: number) => action.payload[i]);
      let shuffled_options: string[] = [];

      questions.map((question: Quiz, index: number) => {
        const optionsIndex = shuffleArray(toRange(question.options.length));
        shuffled_options = optionsIndex.map((i: number) => question.options[i]);
        question.answers = shuffled_options;
        question.questionId = index;
      });
      state.quiz = questions;
    });
    builder.addCase(getQuiz.pending, (state) => {
      state.quiz = [];
    });
    builder.addCase(getQuiz.rejected, (state) => {
      state.quiz = [];
    });
  },
});

export const {
  updateAnswer,
  updatePageNo,
  resetQuiz,
  retryQuiz,
  updateResults,
  updateResultPageNo,
} = quizSlice.actions;

export const useQuiz = () => {
  const quizObj = useSelector((state: RootState) => state.quiz);
  return { ...quizObj };
};

export default quizSlice.reducer;
