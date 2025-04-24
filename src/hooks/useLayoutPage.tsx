import { useState } from "react";

export type ViewModel =
  | "table"
  | "vertical"
  | "vertical-invert"
  | "article"
  | "horizontal"
  | "horizontal-invert";

export default function useLayoutPage() {
  const [layout, setLayout] = useState<ViewModel>("table");

  const handleChangeLayout = (newLayout: ViewModel) => {
    setLayout(newLayout);
  };

  return {
    layout,
    handleChangeLayout,
  };
}
