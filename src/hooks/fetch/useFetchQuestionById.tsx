// Hooks
import { useFetchExtractionQuestions } from "./useFetchExtractionQuestions";
import { useFetchRobQuestions } from "./useFetchRobQuestions";

// Types
import { FormType } from "../../components/Modals/StudyModal/ArticleExtractionData";

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
