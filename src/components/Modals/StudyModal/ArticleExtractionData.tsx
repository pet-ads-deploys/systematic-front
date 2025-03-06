import { ArticlePreviewProps } from "./StudyData";
import ExtractionForm from "../../../pages/Execution/Extraction/subcomponents/forms/ExtractionForm/ExtractionForm";

export default function ArticlesExtrationData({
  studyData,
}: ArticlePreviewProps) {
  return <ExtractionForm studyData={studyData} />;
}
