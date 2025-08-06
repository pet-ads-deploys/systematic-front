// External library
import { useMemo, useState } from "react";

// Types
import { PageLayout } from "../components/structure/LayoutFactory";

type ColumnVisibility = {
  studyReviewId: boolean;
  title: boolean;
  authors: boolean;
  venue: boolean;
  year: boolean;
  selectionStatus: boolean;
  extractionStatus: boolean;
  score: boolean;
  readingPriority: boolean;
};

type UseVisibilityColumnsInput = {
  page: PageLayout;
};

type UseVisibilityColumnsOutput = {
  columnsVisible: ColumnVisibility;
  toggleColumnVisibility: (column: keyof ColumnVisibility) => void;
};

// Constants
const defaultVisibility: ColumnVisibility = {
  studyReviewId: true,
  title: true,
  authors: true,
  venue: true,
  year: true,
  selectionStatus: true,
  extractionStatus: true,
  score: true,
  readingPriority: true,
};

export default function useVisibiltyColumns({
  page,
}: UseVisibilityColumnsInput): UseVisibilityColumnsOutput {
  const initialVisibility = useMemo(() => {
    const visibility = { ...defaultVisibility };
    if (page === "Selection") {
      visibility.extractionStatus = false;
    }
    if (page === "Extraction") {
      visibility.selectionStatus = false;
    }
    return visibility;
  }, [page]);

  const [columnsVisible, setColumnsVisible] =
    useState<ColumnVisibility>(initialVisibility);

  const toggleColumnVisibility = (column: keyof ColumnVisibility) => {
    setColumnsVisible((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return {
    columnsVisible,
    toggleColumnVisibility,
  };
}
