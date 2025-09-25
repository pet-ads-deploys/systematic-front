// External Library
import { useState, useMemo } from "react";

// Types
import type { GenericTableProps, SortConfig } from "./types";

export default function DefaultTable<T extends object>({
  columns,
  data,
}: GenericTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return data;
    }

    const sorted = [...data].sort((primary, secund) => {
      const primaryValue = primary[sortConfig.key];
      const nextValue = secund[sortConfig.key];

      if (primaryValue < nextValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (primaryValue > nextValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
    // CORREÇÃO 2: O array de dependências deve usar `data`, não `articles`
  }, [data, sortConfig]);

  const handleHeaderClick = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} onClick={() => handleHeaderClick(col.key)}>
                  {col.label}
                  {sortConfig?.key === col.key && (
                    <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
