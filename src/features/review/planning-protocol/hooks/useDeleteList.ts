export function useDeletePickList() {
    const handleDeletePickList = (index: number, setAddText: React.Dispatch<React.SetStateAction<string[]>>) => {
      setAddText((prevAddText) => {
        const updatedAddText = [...prevAddText];
        updatedAddText.splice(index, 1);
        return updatedAddText;
      });
    };
  
    return { handleDeletePickList };
  }