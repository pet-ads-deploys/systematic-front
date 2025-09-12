interface ArticleInterface {
  studyReviewId: number; //frontend id
  systematicStudyId: string; //backend id
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
  searchSources:[];
}

export default ArticleInterface;
