// External library
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

// Component
import CreateResponseComponent from "../utils/CreateResponseComponents.tsx";

// Hooks
import { useSendAnswerROBQuestions } from "../../../../../../hooks/tables/useSendAnswerROBQuestions.ts";
import { useSubmitAnswerForm } from "../../../../../../hooks/reviews/forms/useSubmitAnswerForm.tsx";

// Types
import { FormStructure } from "../types.ts";

// Styles
import { button } from "../styles.ts";

export default function RiskOfBiasForm({
  currentId,
  article,
  questionsFiltered,
  handlerUpdateAnswer,
  mutateQuestion,
}: FormStructure) {
  const reviewId = localStorage.getItem("systematicReviewId");

  const navigate = useNavigate();
  const { sendAnswerROBQuestions } = useSendAnswerROBQuestions();
  const { handleSubmitAnswer } = useSubmitAnswerForm({
    responses: article[currentId]?.robQuestions ?? {},
    handleSendAnswer: sendAnswerROBQuestions,
    mutateQuestion,
  });

  const hasQuestions = Object.entries(questionsFiltered).length > 0;

  return (
    <FormControl w="100%" height="100%" gap="3rem" bg="white" overflowY="auto">
      <Box gap="5rem">
        {hasQuestions ? (
          questionsFiltered.map((question) => (
            <CreateResponseComponent
              key={`RISK_OF_BIAS-${currentId}-${question.questionId}`}
              articleId={currentId}
              questionId={question.questionId}
              updateResponse={handlerUpdateAnswer}
              typeform="RISK_OF_BIAS"
              answer={question.answer}
            />
          ))
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
              Create questions to register your answers in the risk of bias
              form.
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
