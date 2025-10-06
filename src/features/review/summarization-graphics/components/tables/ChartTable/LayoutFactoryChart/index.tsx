

// Components
import SkeletonLoader from "@components/feedback/Skeleton";

import { ChartFullTable } from "../../../layout/ChartFullTable";

// Types

import ArticleInterface from "@features/review/shared/types/ArticleInterface";
import NoDataMessage from "@features/review/shared/components/structure/NoDataMessage";

interface LayoutFactoryProps {
  articles: ArticleInterface[] ;
  isLoading: boolean;
}

export default function LayoutFactoryChart({
  articles,
  isLoading,
}: LayoutFactoryProps) {
  return isLoading ? (
    <SkeletonLoader width="100%" height="100%" />
  ) : articles && articles.length > 0 ? (
    <ChartFullTable articles={articles} />
  ) : (
    <NoDataMessage/>
  );
}
