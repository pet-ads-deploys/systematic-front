import { ReactNode } from "react";
import DropdownList from "../Responses/DropdownList/DropdownList";
import LabeledList from "../Responses/LabeledList/LabeledList";
import NumberScale from "../Responses/NumberScale/NumberScale";
import TextualResponse from "../Responses/Textual/Textual";

import { AnswerProps, Questions, TypeOfQuestions } from "../types";

interface CreateResponseProps {
  question: Questions;
  updateResponse: (questionId: string, response: AnswerProps) => void;
}

export const createResponseComponent = ({
  question,
  updateResponse,
}: CreateResponseProps) => {
  const questionTypesMap: Record<TypeOfQuestions, ReactNode> = {
    TEXTUAL: (
      <TextualResponse
        key={question.code}
        question={question.description}
        onResponse={(response) =>
          updateResponse(question.questionId || "", {
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
        minValue={question.lower}
        maxValue={question.higher}
        onResponse={(response) =>
          updateResponse(question.questionId || "", {
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
          updateResponse(question.questionId || "", {
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
          updateResponse(question.questionId || "", {
            value: response,
            type: "PICK_LIST",
          })
        }
      />
    ),
  };

  return questionTypesMap[question.questionType as TypeOfQuestions];
};
