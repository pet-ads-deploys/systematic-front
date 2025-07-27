// External library
import { Box, Text } from "@chakra-ui/react";

// Hooks
import useFetchQuestionAnswers from "../../../../services/useFetchQuestionAnwers";

// components
import PieChart from "../../../../components/charts/PieChart";
import BarChart from "../../../../components/charts/BarChart";
import { QuestionsTable } from "../../../../components/tables/QuestionsTable";

// Styles
import {
  barchartBox,
  graphicsconteiner,
  piechartBox,
  textDescription,
} from "../../styles";

// Types
type Question = {
  questionId: string;
  systematicStudyId: string;
  code: string;
  description: string;
  questionType: "TEXTUAL" | "LABELED_SCALE" | "NUMBERED_SCALE" | "PICK_LIST";
  scales: Record<string, number> | null;
  higher: number | null;
  lower: number | null;
  options: string[] | null;
  context: "EXTRACTION" | "ROB";
};

function parseLabel(labelStr: string) {
  const match = labelStr.match(/Label\(name:\s*(.+),\s*value:\s*(\d+)\)/);
  if (match) {
    return { name: match[1], value: Number(match[2]) };
  }
  return null;
}

function updateData(
  labels: (string | number)[],
  entries: [string, any[]][],
  questionType: string
): number[] {
  if (questionType === "LABELED_SCALE") {
    return labels.map((label) => {
      const entry = entries.find(([entryLabel]) => {
        const match = parseLabel(entryLabel);
        if (!match) return false;
        return match.name === label;
      });
      return entry ? entry[1].length : 0;
    });
  }

  return labels.map((label) => {
    const isPresent = entries.find(
      ([entryLabel]) => entryLabel === label.toString()
    );
    return isPresent ? isPresent[1].length : 0;
  });
}

function updateLabel(question: Question): (string | number)[] {
  const questionType = question.questionType;

  let labels: (string | number)[] = [];

  if (questionType === "NUMBERED_SCALE") {
    const higher = question.higher ?? 0;
    const lower = question.lower ?? 0;
    labels = Array.from({ length: higher - lower + 1 }, (_, i) => lower + i);
  } else if (questionType === "LABELED_SCALE") {
    labels = Object.entries(question.scales ?? {}).map(([key]) => `${key}`);
  } else {
    labels = question.options ?? [];
  }
  return labels;
}

export const QuestionsCharts = () => {
  const { extractionAnswers, isLoadingExtractionAnswers } =
    useFetchQuestionAnswers();

  if (isLoadingExtractionAnswers) return <Text>loading charts...</Text>;
  return (
    <Box display="flex" flexDirection="column" gap={6}>
      {extractionAnswers.map((question) => {
        const description = question.question.description;
        const questionId = question.question.questionId;
        const code = question.question.code;
        const entries = Object.entries(question.answer ?? {});

        const questionType = question.question.questionType;
        let chart = null;
        const labels = updateLabel(question.question);
        const data = updateData(labels, entries, questionType);

        if (
          questionType === "LABELED_SCALE" ||
          questionType === "NUMBERED_SCALE"
        ) {
          chart = (
            <Box sx={graphicsconteiner}>
              <Box sx={piechartBox}>
                <PieChart
                  title={`Question code: ${code}`}
                  labels={labels}
                  data={data}
                />
              </Box>
            </Box>
          );
        } else if (questionType === "PICK_LIST") {
          chart = (
            <Box sx={graphicsconteiner}>
              <Box sx={barchartBox}>
                <BarChart
                  title={`Question code: ${code}`}
                  labels={labels}
                  data={data}
                />
              </Box>
            </Box>
          );
        } else {
          chart = (
            <Box sx={graphicsconteiner}>
              <QuestionsTable data={question.answer ?? {}}></QuestionsTable>
            </Box>
          );
        }

        if (!chart) return null;

        return (
          <Box key={questionId}>
            <Text sx={textDescription}>{description}</Text>
            {chart}
          </Box>
        );
      })}
    </Box>
  );
};
