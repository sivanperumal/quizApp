import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import Results from "./Results";
import { useQuiz } from "../redux/slices/quiz.slice";
import { BoardProps } from "./BoardComp";

jest.mock("../redux/slices/quiz.slice", () => ({
  ...jest.requireActual("../redux/slices/quiz.slice"),
  useQuiz: jest.fn(),
}));
const mockUseQuizData = {
  resultPageNo: 0,
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
};
jest.mock("./BoardComp", () => {
  const BoardComponent = (props: BoardProps) => {
    const { data } = props;

    // Use mock data to render conditionally
    if (data && data.question) {
      return <div>Mock Component with name: {data.question}</div>;
    } else {
      return <div data-testid="mock-boardcomponent">Board Component</div>;
    }
  };
  return BoardComponent;
});

describe("Results View", () => {
  beforeEach(() => {
    (useQuiz as jest.Mock).mockReturnValue(mockUseQuizData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <Results />
      </Provider>
    );
  });

  test("prev button", () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      resultPageNo: 1,
    });
    render(
      <Provider store={setupStore()}>
        <Results />
      </Provider>
    );
    const prevbtn = screen.getByTestId("prev-btn");
    expect(prevbtn).toBeInTheDocument();
    prevbtn.click();
  });

  test("next button", () => {
    render(
      <Provider store={setupStore()}>
        <Results />
      </Provider>
    );
    const nextbtn = screen.getByTestId("next-btn");
    expect(nextbtn).toBeInTheDocument();
    nextbtn.click();
  });

  test("close button", () => {
    (useQuiz as jest.Mock).mockReturnValue({
      ...mockUseQuizData,
      resultPageNo: 1,
    });
    render(
      <Provider store={setupStore()}>
        <Results />
      </Provider>
    );
    const closebtn = screen.getByTestId("close-btn");
    expect(closebtn).toBeInTheDocument();
    closebtn.click();
  });
});
