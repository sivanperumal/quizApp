import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import Preview from "./Preview";
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
  selectedAnswers: [],
};
describe("Preview component", () => {
  beforeEach(() => {
    (useQuiz as jest.Mock).mockReturnValue(mockUseQuizData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <Preview />
      </Provider>
    );
    const element = screen.getByText(/1/i);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
  });
  test("Active class check", () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      selectedAnswers: ["4", "1"],
    });
    render(
      <Provider store={setupStore()}>
        <Preview />
      </Provider>
    );
  });
});
