export enum QuestionType {
  SCALE = "scale",
  MULTIPLE_CHOICE = "multiple-choice",
  SHORT_ANSWER = "short-answer",
}

export type QuestionUnion =
  | ScaleQuestion
  | MultipleChoiceQuestion
  | ShortAnswerQuestion;

export interface Question {
  id: string;
  sessionId: string;
  type: QuestionType;
  text: string;
}

export interface ScaleQuestion extends Question {
  type: QuestionType.SCALE;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
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
  sessionId: string;
  questionId: string;
  response: any;
  skipped: boolean;
}

export interface Session {
  id: string;
  sessionName: string;
  description: string;
  password?: string;
  active: boolean;
  questions: QuestionUnion[];
  answers: Answer[];
}
