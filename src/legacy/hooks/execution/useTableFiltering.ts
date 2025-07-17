import { useMemo } from "react";

const useTableFiltering = (headerData: string[], checkedValues: string[]) => {
  const filteredColumns = useMemo(() => {
    return headerData.filter((column) => !checkedValues.includes(column.toLowerCase()));
  }, [headerData, checkedValues]);

  return filteredColumns;
};

export default useTableFiltering;
