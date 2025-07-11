// External libraries
import { useContext } from "react";
import { useToast } from "@chakra-ui/react";

// Context
import StudySelectionContext from "../../../context/StudiesSelectionContext";

// Hooks
import { useSendAnswerExtractionQuestions } from "../../tables/useSendAnswerExtractionQuestions";
import { useSendAnswerROBQuestions } from "../../tables/useSendAnswerROBQuestions";

// Types
import type {
  AnswerStrucuture,
  ArticleAnswerStrucuture,
} from "../../../pages/Execution/Extraction/subcomponents/forms/types";

interface UseFormSubmissionProps {
  responses: ArticleAnswerStrucuture;
  onQuestionsMutated: () => void;
}

export function useExtractionFormSubmission({
  responses,
  onQuestionsMutated,
}: UseFormSubmissionProps) {
  const toast = useToast();

  const selectionContext = useContext(StudySelectionContext);
  const { sendAnswerExtractionQuestions } = useSendAnswerExtractionQuestions();
  const { sendAnswerROBQuestions } = useSendAnswerROBQuestions();

  const { extractionQuestions, robQuestions } = responses;

  const hasIncompleteAnswers = (answers: AnswerStrucuture[]): boolean => {
    const missingAnswers = answers.some((answer) => {
      if (!answer.answer) return true;
      return answer.answer.value === "" || answer.answer.value == null;
    });

    if (missingAnswers) {
      toast({
        title: "Preencha todas as respostas antes de enviar.",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    }

    return missingAnswers;
  };

  const mapAnswersToPayload = (answers: AnswerStrucuture[]) =>
    answers.map((answer) => ({
      answer:
        answer.type === "NUMBERED_SCALE"
          ? Number(answer.answer.value)
          : answer.answer.value,
      questionId: answer.questionId,
      type: answer.type,
    }));

  const submitResponses = () => {
    const combinedAnswers = [...extractionQuestions, ...robQuestions];

    if (hasIncompleteAnswers(combinedAnswers)) return;

    try {
      sendAnswerExtractionQuestions({
        answers: mapAnswersToPayload(extractionQuestions),
      });

      sendAnswerROBQuestions({
        answers: mapAnswersToPayload(robQuestions),
      });

      onQuestionsMutated();

      if (!selectionContext) {
        console.warn("Context not available");
        return;
      }
      selectionContext.reloadArticles();

      toast({
        title: "Respostas enviadas com sucesso!",
        status: "success",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar respostas",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return { submitResponses };
}
