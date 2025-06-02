import { FormControl, FormLabel } from "@chakra-ui/react";
import AddPickListField from "./AddPickListField";
import InfosPickList from "../../Tables/PickListTable";
import { useAddText } from "../../../hooks/useAddText";
import { useDeletePickList } from "../../../hooks/useDeleteList";
import { formcontrol, label } from "../styles/AddTextTableStyles";
import { useEffect } from "react";

interface AddTextTableProps {
  text: string;
  placeholder: string;
  questionHolder: React.Dispatch<React.SetStateAction<string[]>>
  questions: string[];
}

export default function AddPickListTable({ questions, text, placeholder, questionHolder }: AddTextTableProps) {
  const { AddText, handleAddText, setAddText } = useAddText("");
  const { handleDeletePickList } = useDeletePickList();
  questionHolder(AddText);


  useEffect(() => {
    setAddText(questions);
  }, [])

  return (
    <FormControl sx={label}>
      <FormLabel>{text}</FormLabel>

      <FormControl sx={formcontrol}>
        <AddPickListField onAddText={handleAddText} text={placeholder} />
        <InfosPickList
          typeField={""}
          onDeleteAddedText={(index) => handleDeletePickList(index, setAddText)}
          AddTexts={AddText}
        />
      </FormControl>
    </FormControl>
  );
}