import { Flex } from "@chakra-ui/react";

import ArticlePreview from "../ArticlePreview";

import { PageLayout } from "@features/review/shared/components/structure/LayoutFactory";
import ExtractionForm from "@features/review/execution-extraction/components/forms/ExtractionForm";
import { StudyInterface } from "@features/review/shared/types/IStudy";

interface IStudyDataFiel {
  studyData: StudyInterface;
  page: PageLayout;
}

export interface ArticlePreviewProps {
  studyData: StudyInterface;
  mode?: "selection" | "extraction";
}

export default function StudyDataFiel({ studyData, page }: IStudyDataFiel) {
  const selectionSX = {
    bg: "white",
    w: "100%",
    h: "100%",
    flexDirection: "column",
    alignContent: "center",
    overflowY: "scroll",
    padding: "3",
  };

  return (
    <Flex sx={selectionSX}>
      {page == "Selection" || page == "Identification" ? (
        <ArticlePreview studyData={studyData} mode="selection" />
      ) : (
        <ExtractionForm studyData={studyData} mode="extraction" />
      )}
    </Flex>
  );
}
