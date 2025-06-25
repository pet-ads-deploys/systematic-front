import type {
  AnswerStrucuture,
  HandleSendAnswerProps,
} from "../../../pages/Execution/Extraction/subcomponents/forms/types";

interface SendAnswerProps {
  answers: HandleSendAnswerProps[];
}
interface SubmitAnswerFormProps {
  responses: AnswerStrucuture[];
  handleSendAnswer: ({ answers }: SendAnswerProps) => Promise<void>;
}

export function useSubmitAnswerForm({
  responses,
  handleSendAnswer,
}: SubmitAnswerFormProps) {
  const handleSubmitAnswer = () => {
    const formatedResponses = responses.map((res) => {
      const response = {
        answer:
          res.type === "NUMBERED_SCALE"
            ? Number(res.answer.value)
            : res.answer.value,
        questionId: res.questionId,
        type: res.type,
      };
      return response;
    });

    handleSendAnswer({ answers: formatedResponses });
  };

  return { handleSubmitAnswer };
}
