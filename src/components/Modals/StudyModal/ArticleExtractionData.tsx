// External libraries
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { IoIosCloseCircle } from "react-icons/io";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

// Components
import HeaderForm from "../../../pages/Execution/Extraction/subcomponents/forms/HeaderForm/HeaderForm";
import ExtractionForm from "../../../pages/Execution/Extraction/subcomponents/forms/ExtractionForm/ExtractionForm";
import RiskOfBiasForm from "../../../pages/Execution/Extraction/subcomponents/forms/RobForm/RobForm";

// Hooks
import useFetchAllQuestionsByArticle from "../../../hooks/fetch/useFetchAllQuestionsByArticle";

// Utils
import { capitalize } from "../../../utils/CapitalizeText";

// Types
import type { ArticlePreviewProps } from "./StudyData";
import React from "react";

export type FormType = "EXTRACTION" | "RISK_OF_BIAS";

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

const priorityIconMap: Record<
  string,
  {
    icon: React.ReactNode;
    color: string;
  }
> = {
  VERY_LOW: {
    icon: <MdKeyboardDoubleArrowDown color="#D32F2F" size="1.5rem" />,
    color: "red",
  },
  LOW: {
    icon: <MdKeyboardArrowDown color="#FBC02D" size="1.5rem" />,
    color: "yellow",
  },
  HIGH: {
    icon: <MdKeyboardArrowUp color="#F57C00" size="1.5rem" />,
    color: "orange",
  },
  VERY_HIGH: {
    icon: <MdKeyboardDoubleArrowUp color="#388E3C" size="1.5rem" />,
    color: "green",
  },
};

export default function ArticlesExtrationData({
  studyData,
}: ArticlePreviewProps) {
  const {
    question,
    currentArticleId,
    handlerUpdateAnswerStructure,
    mutateQuestion,
  } = useFetchAllQuestionsByArticle();

  if (!question || !currentArticleId || !question[currentArticleId])
    return null;

  const { extractionQuestions, robQuestions } = question[currentArticleId];

  const extractionStatus = statusIconMap[studyData.extractionStatus];
  const priorityLevel = priorityIconMap[studyData.readingPriority];

  const sections = [
    {
      title: "Extraction Form",
      Component: ExtractionForm,
      questions: extractionQuestions,
    },
    {
      title: "Risk of Bias",
      Component: RiskOfBiasForm,
      questions: robQuestions,
    },
  ];

  return (
    <Box w="100%" h="calc(100vh - 10rem)" bg="white" gap="3rem">
      <HeaderForm text={studyData.title} />
      <Flex gap="2rem" justifyContent="end">
        <Flex
          alignItems="center"
          justifyContent="center"
          h="2rem"
          py={2}
          gap={2}
          bg={`${extractionStatus.color}.100`}
          color={`${extractionStatus.color}.700`}
          fontWeight="semibold"
          fontSize="1rem"
          borderRadius="lg"
          boxShadow="md"
          transition="all 0.3s ease"
          _hover={{
            bg: `${extractionStatus.color}.200`,
          }}
        >
          {extractionStatus.icon}
          {studyData.extractionStatus}
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          h="2rem"
          px={4}
          py={2}
          gap={2}
          bg={`${priorityLevel.color}.100`}
          color={`${priorityLevel.color}.700`}
          fontWeight="semibold"
          fontSize="1rem"
          borderRadius="lg"
          boxShadow="md"
          transition="all 0.3s ease"
          _hover={{
            bg: `${priorityLevel.color}.200`,
          }}
        >
          {priorityLevel.icon}
          {capitalize(
            studyData.readingPriority.toString().toLowerCase() || ""
          ).replace("_", " ")}
        </Flex>
      </Flex>
      <Box w="100%" alignItems="center" mt="2rem">
        {sections.map(({ title, Component, questions }, index) => (
          <React.Fragment key={title}>
            <Box>
              <Flex align="center" borderRadius="md" h="3.5rem" boxShadow="sm">
                <Heading
                  as="h1"
                  size="lg"
                  color="#263C56"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  position="relative"
                  _after={{
                    content: '""',
                    position: "absolute",
                    bottom: "-5px",
                    left: "0",
                    width: "3.5rem",
                    height: ".5rem",
                    bg: "#263C56",
                  }}
                >
                  {title}
                </Heading>
              </Flex>
              <Component
                article={question}
                questionsFiltered={questions}
                currentId={currentArticleId}
                handlerUpdateAnswer={handlerUpdateAnswerStructure}
                mutateQuestion={mutateQuestion}
              />
            </Box>
            {index < sections.length - 1 && (
              <Divider
                orientation="vertical"
                h=".5rem"
                bg="#263C56"
                m="2rem 0"
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
