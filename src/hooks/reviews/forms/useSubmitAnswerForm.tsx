//
import { useToast } from "@chakra-ui/react";

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
  mutateQuestion: () => void;
}

export function useSubmitAnswerForm({
  responses,
  handleSendAnswer,
  mutateQuestion,
}: SubmitAnswerFormProps) {
  const toast = useToast();

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

    const hasIncompleteAnswers = responses.some((res) => {
      if (res.answer == null) return true;
      return res.answer.value === "" || res.answer.value == null;
    });

    if (hasIncompleteAnswers) {
      toast({
        title: "Please complete all answers before submitting.",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      handleSendAnswer({ answers: formatedResponses });
      mutateQuestion();

      toast({
        title: "Response sent successfully!",
        status: "success",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error sending response",
        description: "Try again later.",
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return { handleSubmitAnswer };
}
