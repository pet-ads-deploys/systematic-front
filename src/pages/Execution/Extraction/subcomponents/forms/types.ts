export interface Questions {
  code: string;
  description: string;
  lower: number;
  higher: number;
  options: string[] | null;
  questionId: string | null;
  questionType: string | null;
  scales: Record<string, number>;
  systematicStudyId: string | null;
  context: string;
}

export type TypeOfQuestions =
  | "TEXTUAL"
  | "NUMBERED_SCALE"
  | "LABELED_SCALE"
  | "PICK_LIST";

export type AnswerProps = {
  value: string | number | { name: string; value: number } | null;
  type: TypeOfQuestions;
};

export interface HandleSendAnswerProps {
  questionId: string;
  answer: string | number | { name: string; value: number } | null;
  type: TypeOfQuestions;
}
