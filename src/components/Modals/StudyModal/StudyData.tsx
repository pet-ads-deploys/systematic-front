// External libraries
import { Flex } from "@chakra-ui/react";

// Components
import ArticlePreview from "./ArticlePreview";
import ArticlesExtrationData from "./ArticleExtractionData";

// Types
import { StudyInterface } from "../../../../public/interfaces/IStudy";
import { PageLayout } from "../../../pages/Execution/subcomponents/LayoutFactory";

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

  return page.type === "Selection" ? (
    <Flex sx={selectionSX}>
      <ArticlePreview studyData={studyData} />
    </Flex>
  ) : (
    <Flex sx={selectionSX}>
      <ArticlesExtrationData studyData={studyData} />
    </Flex>
  );
}
