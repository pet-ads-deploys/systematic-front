import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";
import HeaderForm from "../HeaderForm/HeaderForm";
import TextualResponse from "../Responses/Textual/Textual";
import NumberScale from "../Responses/NumberScale/NumberScale";
import { useFetchExtractionQuestions } from "../../../../../../hooks/fetch/useFetchExtractionQuestions";
import { useState } from "react";
import DropdownList from "../Responses/DropdownList/DropdownList";

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

export default function ExtractionForm() {
  const { questions } = useFetchExtractionQuestions();
  const hasQuestions = questions ? questions.length > 0 : false;

  const [responses, setResponses] = useState<Record<string, string>>({});

  const updateResponse = (questionId: string, response: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: response }));
  };

  const handleSubmit = () => {
    console.log("Dados enviados:", responses);
  };

  const createResponseComponent = (question: Questions) => {
    switch (question.questionType) {
      case "TEXTUAL":
        return (
          <TextualResponse
            key={question.code}
            question={question.description}
            onResponse={(response) =>
              updateResponse(question.questionId || "", response)
            }
          />
        );
      case "NUMBERED_SCALE":
        return (
          <NumberScale
            key={question.code}
            question={question.description}
            minValue={question.higher}
            maxValue={question.lower}
            onResponse={(response) =>
              updateResponse(question.questionId || "", response)
            }
          />
        );
      case "PICK_LIST":
        return (
          <DropdownList
            key={question.code}
            question={question.description}
            options={question.options || []}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormControl w="97%" gap="3rem" p="1rem" borderRadius="1rem">
      <HeaderForm text="Formulário: teste" />
      <Box gap="5rem">
        {hasQuestions ? (
          questions?.map((question) => createResponseComponent(question))
        ) : (
          <Text>No questions found.</Text>
        )}
      </Box>
      <Flex w="100%" justifyContent="space-between">
        <Button type="submit" onClick={handleSubmit}>
          Enviar
        </Button>
      </Flex>
    </FormControl>
  );
}
