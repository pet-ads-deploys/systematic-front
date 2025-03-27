import { useState } from "react";

export type ViewModel = "table" | "vertical" | "article" | "horizontal";

export default function useLayoutPage() {
  const [layout, setLayout] = useState<ViewModel>("vertical");

  const handleChangeLayout = (newLayout: ViewModel) => {
    setLayout(newLayout);
  };

  return {
    layout,
    handleChangeLayout,
  };
}
