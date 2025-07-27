export const handleDeleteLabeledList = (label: string, setAddText: React.Dispatch<React.SetStateAction<Record<string, number>>>) => {
  setAddText((prevAddText) => {
    const updatedAddText = { ...prevAddText };
    delete updatedAddText[label]; // Remove a chave do objeto
    return updatedAddText;
  });
};