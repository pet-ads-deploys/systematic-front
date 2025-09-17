

import LineChart from "../../../../components/charts/LineChart.tsx";

import ArticleInterface from "@features/review/shared/types/ArticleInterface.ts";
import { StudyInterface } from "@features/review/shared/types/IStudy.tsx";


type Props={
  filteredStudies:(ArticleInterface | StudyInterface)[],
}
export const IncludedStudiesLineChart = ({ filteredStudies}:Props) => {
 
  
  const categories = [
    ...new Set(filteredStudies.map((study) => String(study.year))),
  ].sort();
  const data = categories.map(
    (year) =>
      filteredStudies.filter((study) => study.year.toString() === year).length
  );

 

  return (
    <LineChart
      title="Included Studies by Year"
      categories={categories}
      data={data}
    />
  );
};
