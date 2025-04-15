export interface SelectedAnswers {
    questionId: number,
    answer: string,
}

export interface Quiz {
    questionId: number,
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    options: string[]
}

export interface QuizState {
    quiz: Quiz[],
    selectedAnswers: string[],
    pageNo: number
}