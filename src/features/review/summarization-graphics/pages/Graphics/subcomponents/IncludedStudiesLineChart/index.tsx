import { Text } from "@chakra-ui/react";
import LineChart from "../../../../components/charts/LineChart.tsx";
import useGetAllReviewArticles from "../../../../../shared/services/useGetAllReviewArticles.ts";

export const IncludedStudiesLineChart = () => {
  const { articles, isLoading } = useGetAllReviewArticles();
  const IncludedArticles = articles.filter(
    (study) => study.extractionStatus === "INCLUDED"
  );

  const categories = [
    ...new Set(IncludedArticles.map((study) => String(study.year))),
  ].sort();
  const data = categories.map(
    (year) =>
      IncludedArticles.filter((study) => study.year.toString() === year).length
  );

  if (isLoading) return <Text>Loading chart...</Text>;

  return (
    <LineChart
      title="Included Studies by Year"
      categories={categories}
      data={data}
    />
  );
};
