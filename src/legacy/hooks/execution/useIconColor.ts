import { useMemo } from "react";

interface UseIconColorProps {
  frequency: number;
}

export function useIconColor({ frequency }: UseIconColorProps) {
  const iconColor = useMemo(() => {
    if (frequency <= 2) {
      return "red";
    } else if (frequency === 3) {
      return "yellow";
    } else {
      return "blue";
    }
  }, [frequency]);

  return iconColor;
}
