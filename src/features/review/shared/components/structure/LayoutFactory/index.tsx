import React, { useState, useEffect } from "react";

// Components
import SkeletonLoader from "@components/feedback/Skeleton";
import NoDataMessage from "../NoDataMessage";
import { SplitVertical } from "../../common/layouts/SplitVertical";
import { FullTable } from "../../common/layouts/FullTable";
import { SplitHorizontal } from "../../common/layouts/SplitHorizontal";
import { FullArticle } from "../../common/layouts/FullArticle";

// Hooks
import { ColumnVisibility } from "@features/review/shared/hooks/useVisibilityColumns";

// Types
import type ArticleInterface from "../../../types/ArticleInterface";
import type { ViewModel } from "../../../hooks/useLayoutPage";

export type PageLayout = "Selection" | "Extraction" | "Identification";

interface LayoutFactoryProps {
  layout: ViewModel;
  articles: ArticleInterface[] | [];
  page: PageLayout;
  isLoading: boolean;
  columnsVisible: ColumnVisibility;
}

export default function LayoutFactory({
  layout,
  articles,
  page,
  isLoading,
  columnsVisible,
}: LayoutFactoryProps) {
  const [currentLayout, setCurrentLayout] = useState<ViewModel>(layout);
  const [selectedArticle, setSelectedArticle] =
    useState<ArticleInterface | null>(null);
  
  useEffect(() => {
    setCurrentLayout(layout);
  }, [layout]);

  const handleRowClick = (article: ArticleInterface) => {
    if (!selectedArticle) {
      setSelectedArticle(article);
      setCurrentLayout("vertical");
    }
  };

  const layoutMap: Record<ViewModel, React.ReactNode> = {
    table: (
      <FullTable
        articles={articles}
        columnsVisible={columnsVisible}
        onRowClick={handleRowClick}
      />
    ),
    vertical: (
      <SplitVertical
        articles={articles}
        isInverted={false}
        page={page}
        columnsVisible={columnsVisible}
      />
    ),
    "vertical-invert": (
      <SplitVertical
        articles={articles}
        isInverted
        page={page}
        columnsVisible={columnsVisible}
      />
    ),
    horizontal: (
      <SplitHorizontal
        articles={articles}
        isInverted={false}
        page={page}
        layout={layout}
        columnsVisible={columnsVisible}
      />
    ),
    "horizontal-invert": (
      <SplitHorizontal
        articles={articles}
        isInverted={true}
        page={page}
        layout={layout}
        columnsVisible={columnsVisible}
      />
    ),
    article: <FullArticle articles={articles} page={page} />,
  };

  return isLoading ? (
    <SkeletonLoader width="100%" height="100%" />
  ) : articles && articles.length > 0 ? (
    layoutMap[currentLayout]
  ) : (
    <NoDataMessage />
  );
}
