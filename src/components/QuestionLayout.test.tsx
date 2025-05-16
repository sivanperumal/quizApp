import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import QuestionLayout from "./QuestionLayout";
import { Provider } from "react-redux";
import { setupStore } from "../redux/store";
import { ActionbtnInerface } from "./ActionBtns";
import { ScoreProps } from "./Scores";

const mockData = {
  questionId: 1,
  category: "maths",
  type: "multiple",
  difficulty: "easy",
  question: "What is 2 + 2?",
  correct_answer: "4",
  incorrect_answers: ["0", " 1", "3"],
  options: ["0", "1", "4", "3"],
  answers: ["0", "1", "4", "3"],
};

jest.mock("./ActionBtns", () => {
  return {
    __esModule: true,
    default: (props: ActionbtnInerface) => (
      <button onClick={props.onOpenModal} data-testid="open-modal">
        Open Modal
      </button>
    ),
  };
});

jest.mock("./Scores", () => {
  return {
    __esModule: true,
    default: (props: ScoreProps) => (
      <button onClick={props.onCloseModal} data-testid="close-modal">
        Open Modal
      </button>
    ),
  };
});

describe("QuestionLayout", () => {
  test("renders correctly", () => {
    render(
      <Provider store={setupStore()}>
        <QuestionLayout data={mockData} />
      </Provider>
    );

    const btn = screen.getByTestId("open-modal");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);

    const modal = screen.getByTestId("close-modal");
    expect(modal).toBeInTheDocument();
    fireEvent.click(modal);
  });
});
