// External libraries
import { Box, Flex } from "@chakra-ui/react";
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
import SkeletonLoader from "@components/feedback/Skeleton";

// Hooks
import useFetchAllQuestionsByArticle from "../../../hooks/fetch/useFetchAllQuestionsByArticle";

// Utils
import { capitalize } from "../../../features/shared/utils/helpers/formatters/CapitalizeText";

// Types
import type { ArticlePreviewProps } from "./StudyData";
import React from "react";
import DataExtraction from "../../../pages/Execution/Extraction/subcomponents/forms/DataExtraction";

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

export default function ExtractionForm({ studyData }: ArticlePreviewProps) {
  const {
    question,
    currentArticleId,
    handlerUpdateAnswerStructure,
    mutateQuestion,
    isLoading,
  } = useFetchAllQuestionsByArticle();

  if (isLoading) return <SkeletonLoader height="100%" width="100%" />;

  if (!question || !currentArticleId || !question[currentArticleId])
    return null;

  const extractionStatus = statusIconMap[studyData.extractionStatus];
  const priorityLevel = priorityIconMap[studyData.readingPriority];

  return (
    <Box w="100%" h="calc(100vh - 10rem)" bg="white" gap="3rem">
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
      <HeaderForm text={studyData.title} />
      <Box w="100%" alignItems="center" mt="2rem">
        <DataExtraction
          currentId={currentArticleId}
          handlerUpdateAnswer={handlerUpdateAnswerStructure}
          questions={question[currentArticleId]}
          mutateQuestion={mutateQuestion}
        />
      </Box>
    </Box>
  );
}
