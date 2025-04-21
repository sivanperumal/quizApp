import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Quiz, QuizState } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { shuffleArray } from "./../../utils";

export const getQuiz = createAsyncThunk("quiz/getQuiz", async () => {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy"
    );
    const data = await response.json();
    return data.results?.map((el: Quiz, index: number) => ({
      ...el,
      options: [...el.incorrect_answers, el.correct_answer],
      questionId: index,
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
      state.pageNo = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuiz.fulfilled, (state, action) => {
      const shuffleIndex = shuffleArray([0, 1, 2, 3, 4]);
      state.quiz = shuffleIndex.map((i: number) => action.payload[i]);
    });
    builder.addCase(getQuiz.pending, (state) => {
      state.quiz = [];
    });
    builder.addCase(getQuiz.rejected, (state) => {
      state.quiz = [];
    });
  },
});

export const { updateAnswer, updatePageNo, resetQuiz, retryQuiz } =
  quizSlice.actions;

export const useQuiz = () => {
  const quizObj = useSelector((state: RootState) => state.quiz);
  return { ...quizObj };
};

export default quizSlice.reducer;
