// External library
import { ReactNode } from "react";

// Components
import DropdownList from "../Responses/DropdownList/DropdownList";
import LabeledList from "../Responses/LabeledList/LabeledList";
import NumberScale from "../Responses/NumberScale/NumberScale";
import TextualResponse from "../Responses/Textual/Textual";

// Hooks
import { useFetchQuestionById } from "../../../../../../hooks/fetch/useFetchQuestionById";

// Types
import type { CreateResponseProps, TypeOfQuestions } from "../types";

export default function CreateResponseComponent({
  articleId,
  questionId,
  typeform,
  answer,
  updateResponse,
}: CreateResponseProps) {
  const question = useFetchQuestionById({
    questionId,
    type: typeform,
  });

  if (!question) return;

  const questionTypesMap: Record<TypeOfQuestions, ReactNode> = {
    TEXTUAL: (
      <TextualResponse
        key={question.code}
        question={question.description}
        answer={answer.value as string}
        onResponse={(response) =>
          updateResponse(articleId, questionId, typeform, {
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
          updateResponse(articleId, questionId, typeform, {
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
        answer={answer.value as string}
        onResponse={(response) =>
          updateResponse(articleId, questionId, typeform, {
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
        answer={answer.value as string}
        onResponse={(response) =>
          updateResponse(articleId, questionId, typeform, {
            value: response,
            type: "PICK_LIST",
          })
        }
      />
    ),
  };

  return questionTypesMap[question.questionType as TypeOfQuestions];
}
