import { Flex } from "@chakra-ui/react";

import ArticlePreview from "./ArticlePreview";

import { PageLayout } from "../../../pages/Execution/subcomponents/LayoutFactory";
import ExtractionForm from "./ExtractionForm";
import { StudyInterface } from "../../../types/IStudy";

interface IStudyDataFiel {
  studyData: StudyInterface;
  page: PageLayout;
}

export interface ArticlePreviewProps {
  studyData: StudyInterface;
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
        <ArticlePreview studyData={studyData} />
      ) : (
        <ExtractionForm studyData={studyData} />
      )}
    </Flex>
  );
}
