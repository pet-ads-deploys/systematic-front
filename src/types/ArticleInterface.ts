interface ArticleInterface {
  studyReviewId: number; //front id
  systematicStudyId: string; //backend systematicStudyId;
  title: string;
  authors: string;
  venue: string;
  year: string;
  selection: string;
  extraction: string;
  readingPriority: string;
  selectionStatus: string;
  extractionStatus: string;
  score: number;
}

export default ArticleInterface;
