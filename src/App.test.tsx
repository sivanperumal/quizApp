import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { setupStore } from "./redux/store";
import { useQuiz } from "./redux/slices/quiz.slice";

jest.mock("./redux/slices/quiz.slice", () => ({
  ...jest.requireActual("./redux/slices/quiz.slice"),
  useQuiz: jest.fn(),
}));

jest.mock("./components/QuestionLayout", () => {
  return {
    __esModule: true,
    default: () => <div>Mock QuestionLayout</div>,
  };
});

jest.mock("./components/Results", () => {
  return {
    __esModule: true,
    default: () => <div>Mock Results</div>,
  };
});

const mockUseQuizData = {
  quizStarted: false,
  resultStarted: false,
  pageNo: 0,
  quiz: [
    {
      question: "Sample Question",
      correct_answer: "Correct Answer",
      incorrect_answers: ["Wrong 1", "Wrong 2", "Wrong 3"],
      options: ["Wrong 1", "Wrong 2", "Wrong 3", "Correct Answer"],
    },
  ],
};

describe("App Component", () => {
  beforeEach(() => {
    (useQuiz as jest.Mock).mockReturnValue(mockUseQuizData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    );

    const element = screen.getByText(/quiz app/i);
    expect(element).toBeInTheDocument();
  });

  test("Start the Quiz", async () => {
    const mockDispatch = jest.fn();
    render(
      <Provider store={{ ...setupStore(), dispatch: mockDispatch }}>
        <App />
      </Provider>
    );

    const btn = screen.getByTestId("start-quiz");
    expect(btn).toBeInTheDocument();
    btn.click();

    // Check if the dispatch function is called with retryQuiz action
    // btn button should not be in the document after click
    // QuestionLayout should be in the document
  });

  test("QuestionLayout renders correctly", async () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      quizStarted: true,
    });
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    );

    const element = await screen.findByText(/Mock QuestionLayout/i);
    expect(element).toBeInTheDocument();
  });

  test("Results renders correctly", async () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      resultStarted: true,
    });
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    );

    const heading = screen.getByText(/Quiz App Results/i);
    expect(heading).toBeInTheDocument();

    const element = await screen.findByText(/Mock Results/i);
    expect(element).toBeInTheDocument();
  });
});
