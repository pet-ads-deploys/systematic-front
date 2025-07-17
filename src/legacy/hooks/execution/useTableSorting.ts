import { useState, useMemo } from "react";
import { TableHeadersInterface } from "../../../types/ITableHeaders";
import { KeyWordHeaderInterface } from "../../../types/IKeyWordHeard";
import { KeywordInterface } from "../../../types/KeywordInterface";
import { StudyInterface } from "../../../types/IStudy";

interface SortOptions {
  sortBy: string | null;
  sortDesc: boolean;
}

const useStudyTableSorting = <
  T extends TableHeadersInterface | KeyWordHeaderInterface,
  U extends StudyInterface | KeywordInterface
>(
  newData: U[],
  newHeader: T
) => {
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: null,
    sortDesc: false,
  });

  const handleSort = (column: string) => {
    if (sortOptions.sortBy === column) {
      setSortOptions({ ...sortOptions, sortDesc: !sortOptions.sortDesc });
    } else {
      setSortOptions({ sortBy: column, sortDesc: false });
    }
  };

  const sortedData = useMemo(() => {
    if (sortOptions.sortBy !== null) {
      return [...newData].sort((a, b) => {
        console.log(sortOptions.sortBy);
        const valueA =
          a[
            Object.keys(newHeader).find(
              (key) => newHeader[key as keyof T] === sortOptions.sortBy
            ) as keyof U
          ];
        const valueB =
          b[
            Object.keys(newHeader).find(
              (key) => newHeader[key as keyof T] === sortOptions.sortBy
            ) as keyof U
          ];
        const comparison =
          typeof valueA === "number" && typeof valueB === "number"
            ? valueA - valueB
            : String(valueA).localeCompare(String(valueB));

        return sortOptions.sortDesc ? comparison * -1 : comparison;
      });
    } else {
      return newData;
    }
  }, [newData, newHeader, sortOptions]);

  return { sortOptions, handleSort, sortedData };
};

export default useStudyTableSorting;
