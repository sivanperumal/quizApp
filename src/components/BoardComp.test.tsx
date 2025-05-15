import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import Board from "./BoardComp";
import { useQuiz } from "../redux/slices/quiz.slice";

jest.mock("../redux/slices/quiz.slice", () => ({
  ...jest.requireActual("../redux/slices/quiz.slice"),
  useQuiz: jest.fn(),
}));

const mockUseQuizData = {
  resultPageNo: 0,
  selectedAnswers: ["4", "1"],
};
const mockQuestionData = {
  questionId: 0,
  category: "maths",
  type: "multiple",
  difficulty: "easy",
  question: "What is 2 + 2?",
  correct_answer: "4",
  incorrect_answers: ["0", " 1", "3"],
  options: ["0", "1", "4", "3"],
  answers: ["0", "1", "4", "3"],
};

describe("Board Component", () => {
  beforeEach(() => {
    (useQuiz as jest.Mock).mockReturnValue(mockUseQuizData);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <Board data={mockQuestionData} boardtype="rBoard" />
      </Provider>
    );
  });
  test("Wrong answer findings", () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      resultPageNo: 1,
    });
    render(
      <Provider store={setupStore()}>
        <Board data={mockQuestionData} boardtype="rBoard" />
      </Provider>
    );
  });

  test("qBoard onchange event", async () => {
    render(
      <Provider store={setupStore()}>
        <Board data={mockQuestionData} boardtype="qBoard" />
      </Provider>
    );

    const inputElements = screen.getAllByRole("radio");
    fireEvent.click(inputElements[0], { target: { value: "0" } });
    expect(screen.getByLabelText("0")).toBeInTheDocument();
  });
});
