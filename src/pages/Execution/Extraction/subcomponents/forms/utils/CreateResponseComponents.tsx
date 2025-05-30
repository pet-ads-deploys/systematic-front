// External library
import { ReactNode } from "react";

// Components
import DropdownList from "../Responses/DropdownList/DropdownList";
import LabeledList from "../Responses/LabeledList/LabeledList";
import NumberScale from "../Responses/NumberScale/NumberScale";
import TextualResponse from "../Responses/Textual/Textual";

// Hooks
import useFetchAllQuestionsByArticle from "../../../../../../hooks/fetch/useFetchAllQuestionsByArticle";

// Types
import type { AnswerProps, Questions, TypeOfQuestions } from "../types";
import type { FormType } from "../../../../../../components/Modals/StudyModal/ArticleExtractionData";

interface CreateResponseProps {
  articleId: number;
  questionId: string;
  answer: AnswerProps;
  typeform: FormType;
  updateResponse: (
    articleId: number,
    type: FormType,
    questionId: string,
    response: AnswerProps
  ) => void;
}

export default function CreateResponseComponent({
  articleId,
  questionId,
  updateResponse,
  typeform,
  answer,
}: CreateResponseProps) {
  const { extractionQuestions, riskOfBiasQuestions } =
    useFetchAllQuestionsByArticle();

  const questionsMap: Record<FormType, Questions[] | undefined> = {
    EXTRACTION: extractionQuestions.questions,
    RISK_OF_BIAS: riskOfBiasQuestions.questions,
  };

  const question = questionsMap[typeform]?.find(
    (q) => q.questionId === questionId
  );

  if (!question) return;

  const questionTypesMap: Record<TypeOfQuestions, ReactNode> = {
    TEXTUAL: (
      <TextualResponse
        key={question.code}
        question={question.description}
        answer={answer.value as string}
        onResponse={(response) =>
          updateResponse(articleId, typeform, question.questionId || "", {
            value: response,
            type: "TEXTUAL",
          })
        }
      />
    ),
    NUMBERED_SCALE: (
      <NumberScale
        key={question.code}
        question={question.description}
        answer={answer.value as string}
        minValue={question.lower}
        maxValue={question.higher}
        onResponse={(response) =>
          updateResponse(articleId, typeform, question.questionId || "", {
            value: response,
            type: "NUMBERED_SCALE",
          })
        }
      />
    ),
    LABELED_SCALE: (
      <LabeledList
        key={question.code}
        question={question.description}
        scales={question.scales}
        onResponse={(response) =>
          updateResponse(articleId, typeform, question.questionId || "", {
            value: response,
            type: "LABELED_SCALE",
          })
        }
      />
    ),
    PICK_LIST: (
      <DropdownList
        key={question.code}
        question={question.description}
        options={question.options || []}
        onResponse={(response) =>
          updateResponse(articleId, typeform, question.questionId || "", {
            value: response,
            type: "PICK_LIST",
          })
        }
      />
    ),
  };

  return questionTypesMap[question.questionType as TypeOfQuestions];
}
