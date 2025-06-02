import type {
  AnswerStrucuture,
  HandleSendAnswerProps,
} from "../../../pages/Execution/Extraction/subcomponents/forms/types";

interface SubmitAnswerFormProps {
  responses: AnswerStrucuture[];
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
    responses.forEach((res) => {
      handleSendAnswer({
        answer:
          res.type === "NUMBERED_SCALE"
            ? Number(res.answer.value)
            : res.answer.value,
        questionId: res.questionId,
        type: res.type,
      });
    });
  };

  return { handleSubmitAnswer };
}
