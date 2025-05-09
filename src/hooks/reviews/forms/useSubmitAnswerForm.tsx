import {
  AnswerProps,
  HandleSendAnswerProps,
} from "../../../pages/Execution/Extraction/subcomponents/forms/types";

interface SubmitAnswerFormProps {
  responses: Record<string, AnswerProps>;
  handleSendAnswer: ({
    questionId,
    type,
    answer,
  }: HandleSendAnswerProps) => Promise<void>;
}

export function useSubmitAnswerForm({
  responses,
  handleSendAnswer,
}: SubmitAnswerFormProps) {
  const handleSubmitAnswer = () => {
    Object.entries(responses).map(([questionId, answer]) => {
      return handleSendAnswer({
        answer:
          answer.type === "NUMBERED_SCALE"
            ? parseInt(answer.value as string)
            : answer.type === "LABELED_SCALE"
            ? answer.value
            : answer.value,
        questionId,
        type: answer.type,
      });
    });
  };

  return { handleSubmitAnswer };
}
