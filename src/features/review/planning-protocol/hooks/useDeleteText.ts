import useCreateProtocol from "../services/useCreateProtocol";

export function useDeleteText(context: string) {
  const { sendAddText } = useCreateProtocol();

  const handleDeleteText = (
    index: number,
    setAddText: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setAddText((prevAddText) => {
      const updatedAddText = [...prevAddText];
      updatedAddText.splice(index, 1);
      sendAddText(updatedAddText, context);
      return updatedAddText;
    });
  };

  return { handleDeleteText };
}
