export interface IQuiz {
  response_code: number;
  results: Question[];
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionResult extends Question {
  all_answers?: string[];
  answered?: string;
  score?: number;
}
