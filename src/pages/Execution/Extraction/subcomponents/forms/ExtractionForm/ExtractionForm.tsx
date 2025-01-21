import { Box, FormControl, Text } from "@chakra-ui/react";
import HeaderForm from "../HeaderForm/HeaderForm";
import TextualResponse from "../Responses/Textual/Textual";
import NumberScale from "../Responses/NumberScale/NumberScale";
import { useFetchExtractionQuestions } from "../../../../../../hooks/fetch/useFetchExtractionQuestions";

export interface Questions {
  code: string;
  description: string;
  lower: number;
  higher: number;
  options: string[] | null;
  questionId: string | null;
  questionType: string | null;
  scales: string | null;
  systematicStudyId: string | null;
}

function createResponseComponent(question: Questions){
  switch (question.questionType) {
    case "TEXTUAL":
      return (
        <TextualResponse
          key={question.code}
          question={question.description}
        />
      );
    case "NUMBERED_SCALE":
      return (
        <NumberScale
          key={question.code}
          question={question.description}
          minValue={question.higher}
          maxValue={question.lower}
        />
      );
    default:
      return null;
  }
}


export default function ExtractionForm() {
  const {questions} = useFetchExtractionQuestions()
  const hasQuestions = questions ? questions.length > 0 : false

  return (
    <FormControl w="97%" gap="3rem">
      <HeaderForm text="Formulário: teste" />
      <Box gap="5rem">
        {hasQuestions ? (
          questions?.map(question => createResponseComponent(question))
        ) : (
          <Text>No questions found.</Text>
        )}
      </Box>
    </FormControl>
  );
}
