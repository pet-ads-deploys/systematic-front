import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";

import HeaderForm from "../HeaderForm/HeaderForm";
import TextualResponse from "../Responses/Textual/Textual.tsx";
import NumberScale from "../Responses/NumberScale/NumberScale.tsx";
import DropdownList from "../Responses/DropdownList/DropdownList";
import LabeledList from "../Responses/LabeledList/LabeledList";

import { useFetchExtractionQuestions } from "../../../../../../hooks/fetch/useFetchExtractionQuestions";
import { useSendAnswerExtractionQuestions } from "../../../../../../hooks/tables/useSendAnswerExtractionQuestions.ts";

import { ArticlePreviewProps } from "../../../../../../components/Modals/StudyModal/StudyData.tsx";

import { button } from "./styles.ts";

import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

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
  context: string;
}

export type TypeOfQuestions =
  | "TEXTUAL"
  | "NUMBERED_SCALE"
  | "LABELED_SCALE"
  | "PICK_LIST";

type AnswerProps = {
  value: string | number | { name: string; value: number };
  type: TypeOfQuestions;
};

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

  const { questions } = useFetchExtractionQuestions();
  const { sendAnswerExtractionQuestions } = useSendAnswerExtractionQuestions();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const requests = Object.entries(responses).map(([questionId, answer]) => {
      return sendAnswerExtractionQuestions({
        answer:
          answer.type === "NUMBERED_SCALE"
            ? parseInt(answer.value as string)
            : answer.type === "LABELED_SCALE"
            ? answer.value
            : answer.value,
        questionId,
        type: answer.type,
      });
    });

    console.log("Dados enviados:", requests);
  };

  const createResponseComponent = (question: Questions) => {
    switch (question.questionType) {
      case "TEXTUAL":
        return (
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
        );
      case "NUMBERED_SCALE":
        return (
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
        );
      case "PICK_LIST":
        return (
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
        );
      case "LABELED_SCALE":
        return (
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
        );
    }
  };

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
