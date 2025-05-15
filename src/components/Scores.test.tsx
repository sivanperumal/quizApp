import { fireEvent, render, screen } from "@testing-library/react";
import Scores from "./Scores";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import { useQuiz } from "../redux/slices/quiz.slice";
jest.mock("../redux/slices/quiz.slice", () => ({
  ...jest.requireActual("../redux/slices/quiz.slice"),
  useQuiz: jest.fn(),
}));

const mockUseQuizData = {
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
  selectedAnswers: ["4", "3"],
};

describe("Scores Component", () => {
  beforeEach(() => {
    (useQuiz as jest.Mock).mockReturnValue(mockUseQuizData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <Scores onCloseModal={jest.fn()} />
      </Provider>
    );
    const showresults = screen.getByTestId("show-results-btn");
    expect(showresults).toBeInTheDocument();
    fireEvent.click(showresults);

    const closeresults = screen.getByTestId("close-btn");
    expect(closeresults).toBeInTheDocument();
    fireEvent.click(closeresults);
  });

  test("Results fail check", () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      selectedAnswers: ["2", "1"],
    });
    render(
      <Provider store={setupStore()}>
        <Scores onCloseModal={jest.fn()} />
      </Provider>
    );
    const element = screen.getByText(/retry/i);
    expect(element).toBeInTheDocument();
    element.click();
  });
});
