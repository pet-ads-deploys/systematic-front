import { useState, useCallback, ChangeEvent } from "react";
import { capitalize } from "../utils/CapitalizeText";

interface UseEditStateProps {
  AddTexts: string[];
  onSaveEdit: (editedValue: string, editIndex: number) => void;
}

export function useEditState({ AddTexts, onSaveEdit }: UseEditStateProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");

  const handleEdit = useCallback(
    (index: number) => {
      setEditIndex(index);
      setEditedValue(AddTexts[index]);
    },
    [AddTexts]
  );

  const handleSaveEdit = useCallback(() => {
    if (editIndex !== null && editedValue !== "") {
      onSaveEdit(editedValue, editIndex);
      setEditIndex(null);
      setEditedValue("");
    }
  }, [editIndex, editedValue, onSaveEdit]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = capitalize(e.target.value)
    setEditedValue(value);
  }, []);

  return { editIndex, handleEdit, handleSaveEdit, editedValue, handleChange };
}
