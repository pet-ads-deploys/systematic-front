// External libraries
import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
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

export type FormType = "EXTRACTION" | "RISK_OF_BIAS";

const buttonStyles = {
  bg: "white",
  borderRadius: ".5rem .5rem 0 0",
};

const forms = [
  { label: "Extraction", type: "EXTRACTION" },
  { label: "Risk Of Bias", type: "RISK_OF_BIAS" },
] as const;

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
  const [formVisible, setFormVisible] = useState<FormType>("EXTRACTION");

  const { question, currentArticleId, handlerUpdateAnswerStructure } =
    useFetchAllQuestionsByArticle();

  if (!question || !currentArticleId || !question[currentArticleId])
    return null;

  const { extractionQuestions, robQuestions } = question[currentArticleId];

  const extractionStatus = statusIconMap[studyData.extractionStatus];
  const priorityLevel = priorityIconMap[studyData.readingPriority];

  return (
    <Box w="100%" h="calc(100vh - 10rem)" bg="white" gap="3rem">
      <HeaderForm text={studyData.title} />
      <Flex gap="2rem">
        <Flex
          alignItems="center"
          justifyContent="center"
          h="2rem"
          px={4}
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
      <Flex w="100%" alignItems="center" justifyContent="start" mt="1rem">
        {forms.map((form) => (
          <Button
            key={form.type}
            sx={buttonStyles}
            border={formVisible === form.type ? "2px solid black" : "none"}
            borderBottom={
              formVisible === form.type ? "none" : "2px solid black"
            }
            onClick={() => setFormVisible(form.type)}
          >
            {form.label}
          </Button>
        ))}
      </Flex>
      <Box mt="2rem">
        {formVisible === "EXTRACTION" ? (
          <ExtractionForm
            article={question}
            questionsFiltered={extractionQuestions}
            currentId={currentArticleId}
            handlerUpdateAnswer={handlerUpdateAnswerStructure}
          />
        ) : (
          <RiskOfBiasForm
            article={question}
            questionsFiltered={robQuestions}
            currentId={currentArticleId}
            handlerUpdateAnswer={handlerUpdateAnswerStructure}
          />
        )}
      </Box>
    </Box>
  );
}
