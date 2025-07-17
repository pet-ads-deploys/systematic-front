import { useMemo, useState } from "react";
import KeysTable from "./subcomponents/KeysTable";

interface keywordsInterface {
  keyword: string;
  frequency: number;
}

interface Props {
  keywords: keywordsInterface[];
}

function KeywordsTable({ keywords }: Props) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof keywordsInterface;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedKeywords = useMemo(() => {
    if (!sortConfig) return keywords;
    return [...keywords].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      if (bValue > aValue) return sortConfig.direction === "asc" ? -1 : 1;
      return 0;
    });
  }, [keywords, sortConfig]);

  const handleHeaderClick = (key: keyof keywordsInterface) => {
    setSortConfig((prevConfig) =>
      prevConfig?.key === key
        ? { key, direction: prevConfig.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  return (
    <KeysTable
      keywords={sortedKeywords}
      handleHeaderClick={handleHeaderClick}
      sortConfig={sortConfig}
    />
  );
}

export default KeywordsTable;
