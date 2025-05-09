import { useState } from "react";

import ExtractionForm from "../../../pages/Execution/Extraction/subcomponents/forms/ExtractionForm/ExtractionForm";
import RiskOfBiasForm from "../../../pages/Execution/Extraction/subcomponents/forms/RobForm/RobForm";

import { ArticlePreviewProps } from "./StudyData";

import { Box, Button, Flex } from "@chakra-ui/react";
import HeaderForm from "../../../pages/Execution/Extraction/subcomponents/forms/HeaderForm/HeaderForm";
import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { IoIosCloseCircle } from "react-icons/io";

type FormType = "EXTRACTION" | "RISK_OF_BIAS";

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

export default function ArticlesExtrationData({
  studyData,
}: ArticlePreviewProps) {
  const [formVisible, setFormVisible] = useState<FormType>("EXTRACTION");
  const extractionStatus = statusIconMap[studyData.extractionStatus];

  return (
    <Box w="100%" h="calc(100vh - 10rem)" bg="white" gap="3rem">
      <HeaderForm text={studyData.title} />
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
      <Flex w="100%" align="center" justifyContent="start">
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
        {formVisible === "EXTRACTION" ? <ExtractionForm /> : <RiskOfBiasForm />}
      </Box>
    </Box>
  );
}
