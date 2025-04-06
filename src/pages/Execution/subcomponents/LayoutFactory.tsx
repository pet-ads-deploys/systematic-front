import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import SkeletonLoader from "../../../components/ui/Skeleton/Skeleton";
import { ViewModel } from "../../../hooks/useLayoutPage";
import NoDataMessage from "./NoDataMessage";
import React, { useState } from "react";
import { SplitVertical } from "./Layouts/SplitVertical";
import { FullTable } from "./Layouts/FullTable";
import { SplitHorizontal } from "./Layouts/SplitHorizontal";
import { FullArticle } from "./Layouts/FullArticle";

export type PageLayout = "Selection" | "Extraction" | "Identification";

interface LayoutFactoryProps {
  layout: ViewModel;
  articles: ArticleInterface[] | [];
  page: PageLayout;
  isLoading: boolean;
}

export default function LayoutFactory({
  layout,
  articles,
  page,
  isLoading,
}: LayoutFactoryProps) {
  const [orderElement, setOrderElement] = useState(false);

  const toggleLayoutOrder = () => {
    setOrderElement((prev) => !prev);
  };

  const layoutMap: Record<ViewModel, React.ReactNode> = {
    table: <FullTable articles={articles} page={page} />,
    vertical: (
      <SplitVertical
        articles={articles}
        orderElement={orderElement}
        toggleLayoutOrder={toggleLayoutOrder}
        page={page}
      />
    ),
    horizontal: (
      <SplitHorizontal
        articles={articles}
        orderElement={orderElement}
        toggleLayoutOrder={toggleLayoutOrder}
        page={page}
      />
    ),
    article: <FullArticle articles={articles} page={page} />,
  };

  return isLoading ? (
    <SkeletonLoader width="100%" height="100%" />
  ) : articles && articles.length > 0 ? (
    layoutMap[layout]
  ) : (
    <NoDataMessage />
  );
}
