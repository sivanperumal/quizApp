# React + TypeScript + Vite

## Homepage

Button: Start Quiz

Total no of questions: 30

user can view 1 questions at a time

bottom button options: next, prev

if user reach last question (30th): then show submit button instead of next

once submit successfully show popup

- no of correct questions
- no of incorrect questions
- percentage
- Pass / Fail
- close
- Retry

Future scope

- show current state of all the questions
- timer setup
- show warning toast before (5mins) closing the test

## API details

https://opentdb.com/api.php?amount=30&category=18&difficulty=easy

{
"type": "multiple" | "boolean",
"question": string,
"correct_answer": string,
options: string[]
}[]

{
questionId: num,
answer: string,
}[]
