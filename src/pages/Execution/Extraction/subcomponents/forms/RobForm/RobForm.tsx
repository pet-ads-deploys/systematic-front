import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";

import { useFetchRobQuestions } from "../../../../../../hooks/fetch/useFetchRobQuestions.tsx";
import { useSendAnswerROBQuestions } from "../../../../../../hooks/tables/useSendAnswerROBQuestions.ts";
import { useSubmitAnswerForm } from "../../../../../../hooks/reviews/forms/useSubmitAnswerForm.tsx";

import { AnswerProps } from "../types.ts";

import { createResponseComponent } from "../utils/createResponseComponents.tsx";

import { button } from "../styles.ts";

import { FaPlusCircle } from "react-icons/fa";

export default function RiskOfBiasForm() {
  const [responses, setResponses] = useState<Record<string, AnswerProps>>({});
  const updateResponse = (questionId: string, response: AnswerProps) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        value: response.value,
        type: response.type,
      },
    }));
  };
  const reviewId = localStorage.getItem("systematicReviewId");

  const navigate = useNavigate();
  const { questions } = useFetchRobQuestions();
  const { sendAnswerROBQuestions } = useSendAnswerROBQuestions();
  const { handleSubmitAnswer } = useSubmitAnswerForm({
    responses,
    handleSendAnswer: sendAnswerROBQuestions,
  });

  const hasQuestions = questions ? questions.length > 0 : false;

  return (
    <FormControl w="100%" height="100%" gap="3rem" bg="white" overflowY="auto">
      <Box gap="5rem">
        {hasQuestions ? (
          questions?.map((question) =>
            createResponseComponent({ question, updateResponse })
          )
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
          <Button type="submit" onClick={handleSubmitAnswer}>
            Enviar
          </Button>
        ) : null}
      </Flex>
    </FormControl>
  );
}
