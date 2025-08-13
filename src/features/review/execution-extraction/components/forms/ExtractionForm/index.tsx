// External library
//import React from "react";
import { Box } from "@chakra-ui/react";

// Components
import HeaderForm from "../DataExtraction/subcomponents/Header";
import SkeletonLoader from "@components/feedback/Skeleton";
import ArticleHeader from "@features/review/shared/components/table/header/ArticleHeader";

// Hooks
import useFetchAllQuestionsByArticle from "../../../services/useFetchAllQuestionsByArticle";

// Types
import DataExtraction from "../DataExtraction";
import { ArticlePreviewProps } from "@features/review/shared/components/common/tables/StudyData";

export type FormType = "EXTRACTION" | "RISK_OF_BIAS";

export default function ExtractionForm({ studyData }: ArticlePreviewProps) {
  const {
    question,
    currentArticleId,
    handlerUpdateAnswerStructure,
    mutateQuestion,
    isLoading,
  } = useFetchAllQuestionsByArticle();

  if (isLoading) return <SkeletonLoader height="100%" width="100%" />;

  if (!question || !currentArticleId || !question[currentArticleId])
    return null;

  return (
    <Box w="100%" h="calc(100vh - 10rem)" bg="white" gap="3rem">
      <ArticleHeader studyData={studyData} />
      <HeaderForm text={studyData.title} />
      <Box w="100%" alignItems="center" mt="2rem">
        <DataExtraction
          currentId={currentArticleId}
          handlerUpdateAnswer={handlerUpdateAnswerStructure}
          questions={question[currentArticleId]}
          mutateQuestion={mutateQuestion}
        />
      </Box>
    </Box>
  );
}