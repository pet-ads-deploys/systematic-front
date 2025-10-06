export type SortDirection = "asc" | "desc";

export type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
} | null;

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
};

export interface GenericTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
}
