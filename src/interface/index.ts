export interface SelectedAnswers {
    questionId: number,
    answer: string,
}

export interface Quiz {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
}

export interface QuizState {
    quiz: Quiz[],
    selectedAnswers: SelectedAnswers[],
}