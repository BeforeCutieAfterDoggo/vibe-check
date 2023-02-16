// export type QuestionType = "scale" | "multiple-choice" | "short-answer";

export enum QuestionType {
  SCALE = "scale",
  MULTIPLE_CHOICE = "multiple-choice",
  SHORT_ANSWER = "short-answer",
}

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
  type: QuestionType.SCALE;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  enableNote: boolean;
  noteComment?: string;
}

export interface MultipleChoiceQuestion extends Question {
  type: QuestionType.MULTIPLE_CHOICE;
  options: string[];
  allowOther: boolean;
  maxSelections?: number;
  minSelections?: number;
}

export interface ShortAnswerQuestion extends Question {
  type: QuestionType.SHORT_ANSWER;
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
  active: boolean;
  questions: QuestionUnion[];
  answers: Answer[];
}
