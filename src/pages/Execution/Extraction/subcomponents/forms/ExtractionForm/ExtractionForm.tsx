import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";
import HeaderForm from "../HeaderForm/HeaderForm";

import { useFetchExtractionQuestions } from "../../../../../../hooks/fetch/useFetchExtractionQuestions";
import { useState } from "react";
import DropdownList from "../Responses/DropdownList/DropdownList";
import LabeledList from "../Responses/LabeledList/LabeledList";
import TextualResponse from "../Responses/Textual/Textual.tsx";
import NumberScale from "../Responses/NumberScale/NumberScale.tsx";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { button } from "./styles.ts";

export interface Questions {
  code: string;
  description: string;
  lower: number;
  higher: number;
  options: string[] | null;
  questionId: string | null;
  questionType: string | null;
  scales: Record<string, number>;
  systematicStudyId: string | null;
}

export default function ExtractionForm() {
  const reviewId = localStorage.getItem("systematicReviewId");
  const navigate = useNavigate();
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
            minValue={question.lower}
            maxValue={question.higher}
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
      case "LABELED_SCALE":
        return (
          <LabeledList
            key={question.code}
            question={question.description}
            scales={question.scales}
          />
        );
    }
  };

  return (
    <FormControl
      w="100%"
      gap="3rem"
      borderRadius="1rem"
      bg="white"
      p="0 1rem"
      borderTop="1rem solid #263C56"
      mt="2rem"
      overflowY="auto"
    >
      <HeaderForm text="Formulário: teste" />
      <Box gap="5rem">
        {hasQuestions ? (
          questions?.map((question) => createResponseComponent(question))
        ) : (
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            gap="1rem"
            p="2rem"
            borderRadius="8px"
            border="1px solid #ccc"
            bg="white"
            w={"100%"}
          >
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              No questions found
            </Text>
            <Text fontSize="md" color="gray.600">
              Create questions to register your answers in the extraction form.
            </Text>

            <Button
              leftIcon={<FaPlusCircle />}
              sx={button}
              _hover={{
                bg: "white",
                color: "black",
                border: "2px solid black",
              }}
              w="30%"
              onClick={() =>
                navigate(`/newReview/ProtocolPartThree/${reviewId}`)
              }
            >
              Create Questions
            </Button>
          </Flex>
        )}
      </Box>
      <Flex w="100%" justifyContent="space-between" pb="1rem">
        {hasQuestions ? (
          <Button type="submit" onClick={handleSubmit}>
            Enviar
          </Button>
        ) : null}
      </Flex>
    </FormControl>
  );
}
