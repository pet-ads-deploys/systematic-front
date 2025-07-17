import { useMemo } from "react";

export default function useColumnVisibility(filteredColumns: string[]) {
  const shouldHideColumn = (columnName: string) => {
    if (filteredColumns.length === 0) {
      return false;
    }
    return !filteredColumns.includes(columnName);
  };

  const getColumnVisibility = useMemo(() => {
    return (columnName: string) => shouldHideColumn(columnName);
  }, [filteredColumns]);

  return getColumnVisibility;
}
