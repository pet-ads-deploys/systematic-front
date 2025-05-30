// External library
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

// Component
import CreateResponseComponent from "../utils/CreateResponseComponents.tsx";

// Hooks
import useFetchAllQuestionsByArticle from "../../../../../../hooks/fetch/useFetchAllQuestionsByArticle.ts";
import { useSendAnswerExtractionQuestions } from "../../../../../../hooks/tables/useSendAnswerExtractionQuestions.ts";
import { useSubmitAnswerForm } from "../../../../../../hooks/reviews/forms/useSubmitAnswerForm.tsx";

// Types
import type { FormsToExtractionData } from "../../../../../../hooks/fetch/useFetchAllQuestionsByArticle.ts";

// Styles
import { button } from "../styles.ts";

export default function ExtractionForm({
  questionsFiltered,
  handlerUpdateAnswer,
}: FormsToExtractionData) {
  const reviewId = localStorage.getItem("systematicReviewId");

  const { currentArticleId } = useFetchAllQuestionsByArticle();

  const navigate = useNavigate();
  const { sendAnswerExtractionQuestions } = useSendAnswerExtractionQuestions();
  const { handleSubmitAnswer } = useSubmitAnswerForm({
    responses: questionsFiltered[currentArticleId || -1] ?? {},
    handleSendAnswer: sendAnswerExtractionQuestions,
  });

  const hasQuestions = Object.entries(questionsFiltered).length > 0;

  return (
    <FormControl w="100%" height="100%" gap="3rem" bg="white" overflowY="auto">
      <Box gap="5rem">
        {hasQuestions ? (
          Object.entries(questionsFiltered).map(([articleId, formAnswers]) =>
            Object.entries(formAnswers).map(([questionId, answer]) => (
              <CreateResponseComponent
                key={`EXTRACTION-${articleId}-${questionId}`}
                articleId={Number(articleId)}
                questionId={questionId}
                updateResponse={handlerUpdateAnswer}
                typeform="EXTRACTION"
                answer={answer}
              />
            ))
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
