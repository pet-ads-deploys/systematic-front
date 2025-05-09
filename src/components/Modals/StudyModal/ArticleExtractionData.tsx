import { useState } from "react";

import ExtractionForm from "../../../pages/Execution/Extraction/subcomponents/forms/ExtractionForm/ExtractionForm";
import RiskOfBiasForm from "../../../pages/Execution/Extraction/subcomponents/forms/RobForm/RobForm";

import { ArticlePreviewProps } from "./StudyData";

import { Box, Button, Flex } from "@chakra-ui/react";

type FormType = "EXTRACTION" | "RISK_OF_BIAS";

const buttonStyles = {
  bg: "white",
  borderRadius: ".5rem .5rem 0 0",
};

const forms = [
  { label: "Extraction", type: "EXTRACTION" },
  { label: "Risk Of Bias", type: "RISK_OF_BIAS" },
] as const;

export default function ArticlesExtrationData({
  studyData,
}: ArticlePreviewProps) {
  const [formVisible, setFormVisible] = useState<FormType>("EXTRACTION");

  return (
    <Box w="100%" h="calc(100vh - 10rem)" bg="white" gap="3rem">
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
        {formVisible === "EXTRACTION" ? (
          <ExtractionForm studyData={studyData} />
        ) : (
          <RiskOfBiasForm studyData={studyData} />
        )}
      </Box>
    </Box>
  );
}
