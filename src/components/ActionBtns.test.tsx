import { Provider } from "react-redux";
import ActionBtns from "./ActionBtns";
import { setupStore } from "../redux/store";
import { render } from "@testing-library/react";
import { useQuiz } from "../redux/slices/quiz.slice";
import { screen } from "@testing-library/dom";

jest.mock("../redux/slices/quiz.slice", () => ({
  ...jest.requireActual("../redux/slices/quiz.slice"),
  useQuiz: jest.fn(),
}));

const mockUseQuizData = {
  pageNo: 0,
  quiz: [
    {
      question: "What is 2 + 2?",
      correct_answer: "4",
      incorrect_answers: ["0", " 1", "3"],
      options: ["0", "1", "4", "3"],
      answers: ["0", "1", "4", "3"],
    },
    {
      question: "What is 2 + 1?",
      correct_answer: "3",
      incorrect_answers: ["0", " 1", "4"],
      options: ["0", "1", "4", "3"],
      answers: ["0", "1", "4", "3"],
    },
  ],
  selectedAnswers: ["4", "1"],
};

describe("ActionBtns", () => {
  beforeEach(() => {
    (useQuiz as jest.Mock).mockReturnValue(mockUseQuizData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <ActionBtns onOpenModal={jest.fn()} />
      </Provider>
    );
  });

  test("prev button", () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      pageNo: 1,
    });
    render(
      <Provider store={setupStore()}>
        <ActionBtns onOpenModal={jest.fn()} />
      </Provider>
    );
    const prevbtn = screen.getByTestId("prev-btn");
    expect(prevbtn).toBeInTheDocument();
    prevbtn.click();
  });

  test("next button", () => {
    render(
      <Provider store={setupStore()}>
        <ActionBtns onOpenModal={jest.fn()} />
      </Provider>
    );
    const nextbtn = screen.getByTestId("next-btn");
    expect(nextbtn).toBeInTheDocument();
    nextbtn.click();
  });

  test("submit button", () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      pageNo: 1,
    });
    render(
      <Provider store={setupStore()}>
        <ActionBtns onOpenModal={jest.fn()} />
      </Provider>
    );
    const submitbtn = screen.getByTestId("submit-btn");
    expect(submitbtn).toBeInTheDocument();
    submitbtn.click();
  });

  test("pending submit button", () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      pageNo: 1,
      selectedAnswers: ["4"],
    });
    render(
      <Provider store={setupStore()}>
        <ActionBtns onOpenModal={jest.fn()} />
      </Provider>
    );
    const submitbtn = screen.getByTestId("submit-btn");
    expect(submitbtn).toBeInTheDocument();
    submitbtn.click();
  });
});
