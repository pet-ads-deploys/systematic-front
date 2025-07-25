import { useState } from "react";

export function useAddLabeledList() {
  const [AddText, setAddText] = useState<Record<string, number>>({});

  const fetchAddText = async (obj: Record<string, number>) => {
    setAddText(obj);
  };

  const handleAddText = (newKeyword: {label: string, value: number}) => {
    setAddText((prevAddText) => ({
      ...prevAddText,
      [newKeyword.label]: newKeyword.value,
    }));
  };

  return { AddText, handleAddText, setAddText, fetchAddText };
}
