// Hooks
import { useFetchExtractionQuestions } from "../../execution-extraction/services/useFetchExtractionQuestions";
import { useFetchRobQuestions } from "../../execution-extraction/services/useFetchRobQuestions";

// Types
import type { FormType } from "../../execution-extraction/components/forms/ExtractionForm";

type QuestionByIdProps = {
  questionId: string;
  type: FormType;
};

export function useFetchQuestionById({ questionId, type }: QuestionByIdProps) {
  const { questions: extractionQuestions } = useFetchExtractionQuestions();
  const { questions: robQuestions } = useFetchRobQuestions();

  if (!extractionQuestions || !robQuestions) return;

  const data =
    type === "EXTRACTION"
      ? extractionQuestions.find((q) => q.questionId == questionId)
      : robQuestions.find((q) => q.questionId == questionId);

  return data;
}
