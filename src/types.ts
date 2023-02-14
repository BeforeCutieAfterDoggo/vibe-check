export type QuestionType = "scale" | "multiple-choice" | "short-answer";

export type QuestionSource = "admin" | "user" | "bot";

export type QuestionUnion =
  | ScaleQuestion
  | MultipleChoiceQuestion
  | ShortAnswerQuestion;

export interface Question {
  type: QuestionType;
  text: string;
  source: QuestionSource;
}

export interface ScaleQuestion extends Question {
  type: "scale";
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
}

export interface MultipleChoiceQuestion extends Question {
  type: "multiple-choice";
  options: string[];
  allowOther: boolean;
  maxSelections?: number;
  minSelections?: number;
}

export interface ShortAnswerQuestion extends Question {
  type: "short-answer";
}

export interface Answer {
  userId: string;
  questionId: string;
  response: any;
  skipped: boolean;
}

export interface Session {
  sessionName: string;
  description: string;
  questions: QuestionUnion[];
  answers: Answer[];
}
