import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";

import HeaderForm from "../HeaderForm/HeaderForm";

import { useFetchExtractionQuestions } from "../../../../../../hooks/fetch/useFetchExtractionQuestions";
import { useSendAnswerExtractionQuestions } from "../../../../../../hooks/tables/useSendAnswerExtractionQuestions.ts";

import { AnswerProps } from "../types.ts";
import { ArticlePreviewProps } from "../../../../../../components/Modals/StudyModal/StudyData.tsx";

import { createResponseComponent } from "../utils/createResponseComponents.tsx";

import { button } from "../styles.ts";

import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useSubmitAnswerForm } from "../../../../../../hooks/reviews/forms/useSubmitAnswerForm.tsx";

export default function ExtractionForm({ studyData }: ArticlePreviewProps) {
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
  const { questions } = useFetchExtractionQuestions();
  const { sendAnswerExtractionQuestions } = useSendAnswerExtractionQuestions();
  const { handleSubmitAnswer } = useSubmitAnswerForm({
    responses,
    handleSendAnswer: sendAnswerExtractionQuestions,
  });

  const statusIconMap: Record<
    string,
    {
      icon: React.ReactNode;
      color: string;
    }
  > = {
    INCLUDED: {
      icon: <CheckCircleIcon color="green.500" />,
      color: "green",
    },
    DUPLICATED: {
      icon: <InfoIcon color="blue.500" />,
      color: "blue",
    },
    EXCLUDED: {
      icon: <IoIosCloseCircle color="red.500" size="1.4rem" />,
      color: "red",
    },
    UNCLASSIFIED: {
      icon: <WarningIcon color="yellow.500" />,
      color: "yellow",
    },
  };

  const extractionStatus = statusIconMap[studyData.extractionStatus];

  const hasQuestions = questions ? questions.length > 0 : false;

  return (
    <FormControl w="100%" height="100%" gap="3rem" bg="white" overflowY="auto">
      <Flex gap="2rem">
        <Flex
          justifyContent="center"
          alignItems="center"
          fontFamily="sans-serif"
          fontSize="1rem"
          p=".5rem .25rem"
          gap="1rem"
          borderRadius="1rem"
          bg={`${extractionStatus.color}.200`}
          color={`${extractionStatus.color}.800`}
          maxW="10rem"
          w="10rem"
          h="2rem"
        >
          {extractionStatus.icon}
          {studyData.extractionStatus}
        </Flex>
      </Flex>
      <HeaderForm text={studyData.title} />
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
