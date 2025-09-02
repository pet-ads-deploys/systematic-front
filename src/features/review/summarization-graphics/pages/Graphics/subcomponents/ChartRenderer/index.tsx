import { Box, Text } from "@chakra-ui/react";

import {
  barchartBox,
  fluxogramaBox,
  graphicsconteiner,
  piechartBox,
} from "../../styles";
import CriteriaBarChart from "../CriteriaBarChart";
import { SearchSorcesTable } from "@features/review/summarization-graphics/components/tables/SearchSoucesTable";
import { IncludedStudiesTable } from "@features/review/summarization-graphics/components/tables/IncludedStudiesTable";
import { IncludedStudiesLineChart } from "../IncludedStudiesLineChart";
import { QuestionsCharts } from "../QuestionsCharts";
import StudiesFunnelChart from "../StudiesFunnelChart";
import PieChart from "@features/review/summarization-graphics/components/charts/PieChart";
import BarChart from "@features/review/summarization-graphics/components/charts/BarChart";
import useGetAllReviewArticles from "@features/review/shared/services/useGetAllReviewArticles";
import { StudyInterface } from "@features/review/shared/types/IStudy";
import { useMemo } from "react";
import ArticleInterface from "@features/review/shared/types/ArticleInterface";

type Props = {
  section: string;
  type: string;
  filters: Filters;
  selectedQuestionId?: string;
};

 export type Filters = {
  startYear?: number;
  endYear?: number;
  sources?: string[];
  criteria?: string[];
};

export default function ChartsRenderer({
  section,
  type,
  filters,
  selectedQuestionId,
}: Props) {
  const { articles, isLoading: isLoadingArticles } = useGetAllReviewArticles();

  // Filtrar
  const filteredStudies = useMemo(() => {
    return articles
      .filter((s) => {
        const year = Number(s.year);
        if (filters.startYear && year < filters.startYear) return false;
        if (filters.endYear && year > filters.endYear) return false;
        return true;
      })
      .filter((s) =>
        filters.sources && filters.sources.length > 0
          ? s.searchSources.some((src) => filters.sources!.includes(src))
          : true
      )
    
  }, [articles, filters]);
  console.log(filteredStudies);

  let content;

  switch (section) {
    case "Search Sources":
      if (isLoadingArticles) {
        content = <Text>Loading chart ...</Text>;
        break;
      }

      // Group by source
      const sourceCountMap = useMemo(() => {
        const map: Record<string, number> = {};
        filteredStudies.forEach((s) => {
          s.searchSources.forEach((src) => {
            map[src] = (map[src] || 0) + 1;
          });
        });
        return map;
      }, [filteredStudies]);

      const labels = Object.keys(sourceCountMap);
      const totalOfStudies = Object.values(sourceCountMap);

      switch (type) {
        case "Pie Chart":
          content = (
            <Box sx={piechartBox}>
              <PieChart
                title="Search Sources"
                labels={labels}
                data={totalOfStudies}
              />
            </Box>
          );
          break;
        case "Bar Chart":
          content = (
            <Box sx={barchartBox}>
              <BarChart
                title="Search Sources"
                labels={labels}
                data={totalOfStudies}
              />
            </Box>
          );
          break;
        case "Table":
          content = <SearchSorcesTable />;
          break;
      }
      break;
    case "S1_Inclusion Criteria":
      if (type === "Bar Chart") {
        content = (
          <Box sx={barchartBox}>
            <CriteriaBarChart
              criteria="inclusion"
              stage="selection"
              filteredStudies={filteredStudies}
            />
          </Box>
        );
      }
      break;

    case "S1_Exclusion Criteria":
      if (type === "Bar Chart") {
        content = (
          <Box sx={barchartBox}>
            <CriteriaBarChart
              criteria="exclusion"
              stage="selection"
              filteredStudies={filteredStudies}
            />
          </Box>
        );
      }
      break;

    case "S2_Inclusion Criteria":
      if (type === "Bar Chart") {
        content = (
          <Box sx={barchartBox}>
            <CriteriaBarChart
              criteria="inclusion"
              stage="extraction"
              filteredStudies={filteredStudies}
            />
          </Box>
        );
      }
      break;

    case "S2_Exclusion Criteria":
      if (type === "Bar Chart") {
        content = (
          <Box sx={barchartBox}>
            <CriteriaBarChart
              criteria="exclusion"
              stage="extraction"
              filteredStudies={filteredStudies}
            />
          </Box>
        );
      }
      break;

    case "Included Studies":
      const includedStudies = useMemo<(StudyInterface | ArticleInterface)[]>(
        () => {
          return filteredStudies
            .filter((study) => study.extractionStatus === "INCLUDED")
            .filter((s): s is StudyInterface =>
              filters.criteria && filters.criteria.length > 0
                ? "criteria" in s
                : true
            )
            .filter((study) =>
              filters.criteria && filters.criteria.length > 0
                ? study.criteria.some((c) => filters.criteria!.includes(c))
                : true
            );
        },
        filteredStudies
      );

      switch (type) {
        case "Table":
          content = <IncludedStudiesTable filteredStudies={includedStudies} />;
          break;
        case "Line Chart":
          content = (
            <IncludedStudiesLineChart filteredStudies={includedStudies} />
          );
          break;
      }
      break;

    case "Form Questions":
      content = <QuestionsCharts selectedQuestionId={selectedQuestionId} />;
      break;

    case "Studies Funnel":
      content = (
        <Box sx={fluxogramaBox}>
          <StudiesFunnelChart />
        </Box>
      );
      break;
  }

  return <Box sx={graphicsconteiner}>{content}</Box>;
}
