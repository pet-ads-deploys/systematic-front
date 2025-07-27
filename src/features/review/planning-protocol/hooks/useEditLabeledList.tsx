import { useState } from "react";

export function useEditLabeledList({ AddTexts, onSaveEdit }: any) {
  const [editLabel, setEditLabel] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<{ label: string; value: number }>({ label: "", value: 0 });

  const handleEdit = (label: string) => {
    setEditLabel(label);
    setEditedValue({ label, value: AddTexts[label] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedValue((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };

  const handleSaveEdit = () => {
    if (editLabel) {
      onSaveEdit(editedValue, editLabel);
      setEditLabel(null);
    }
  };

  return { editLabel, handleEdit, handleSaveEdit, editedValue, handleChange };
}
