import { useState, useMemo } from "react";
import { useFetchExtractionQuestions } from "@features/review/execution-extraction/services/useFetchExtractionQuestions";
import { useFetchRobQuestions } from "@features/review/execution-extraction/services/useFetchRobQuestions";

 export type FilterType = "Start Year" | "End Year" | "Source" | "Criteria";

export type FiltersState = {
  startYear?: number;
  endYear?: number;
  source?: string[];
  criteria?:string[];
};

export function useGraphicsState() {
  //perguntas
  const { questions: extractionQuestions = [] } = useFetchExtractionQuestions();
  const { questions: robQuestions = [] } = useFetchRobQuestions();
  const allQuestions = useMemo(
    () => [...extractionQuestions, ...robQuestions],
    [extractionQuestions, robQuestions]
  );

  // estados principais
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | undefined>(
    allQuestions[0]?.questionId ?? undefined
  );
  const [section, setSection] = useState("");
  const [type, setType] = useState("");
  const [filters, setFilters] = useState<FiltersState>({});

  // tipos por seção
  const allowedTypes: Record<string, string[]> = {
    "Search Sources": ["Pie Chart", "Bar Chart", "Table"],
    "S1_Inclusion Criteria": ["Bar Chart"],
    "S1_Exclusion Criteria": ["Bar Chart"],
    "S2_Inclusion Criteria": ["Bar Chart"],
    "S2_Exclusion Criteria": ["Bar Chart"],
    "Studies Funnel": [],
    "Included Studies": ["Line Chart", "Table"],
  };

  const filtersBySection: Record<string, FilterType[]> = {
    "Search Sources": ["Start Year", "End Year", "Source"],
    "S1_Inclusion Criteria": ["Start Year", "End Year", "Source"],
    "S1_Exclusion Criteria": ["Start Year", "End Year", "Source"],
    "S2_Inclusion Criteria": ["Start Year", "End Year", "Source"],
    "S2_Exclusion Criteria": ["Start Year", "End Year", "Source"],
    "Studies Funnel": [],
    "Included Studies": ["Start Year", "End Year", "Source","Criteria"],
    "Form Questions": ["Start Year", "End Year", "Source"],
  };

  const handleSectionChange = (section: string) => {
    setSection(section);
    const allowed = allowedTypes[section] || [];
    setType(allowed.length > 0 ? allowed[0] : "");
  };

  const currentAllowedTypes = allowedTypes[section] || [];

  return {
    allQuestions,
    selectedQuestionId,
    section,
    type,
    filters,
    filtersBySection,
    currentAllowedTypes,
    setSelectedQuestionId,
    setSection,
    setType,
    setFilters,
    handleSectionChange,
  };
}
