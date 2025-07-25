import { FormControl, FormLabel } from "@chakra-ui/react";
import AddPickListField from "./AddPickListField";
import {
  formcontrol,
  label,
} from "@features/review/planning-protocol/components/common/inputs/text/AddTextTable/styles";
import { useEffect } from "react";
import { useAddText } from "@features/review/planning-protocol/services/useAddText";
import { useDeletePickList } from "@features/review/planning-protocol/hooks/useDeleteList";
import InfosPickList from "@components/Tables/PickListTable";

interface AddTextTableProps {
  text: string;
  placeholder: string;
  questionHolder: React.Dispatch<React.SetStateAction<string[]>>;
  questions: string[];
}

export default function AddPickListTable({
  questions,
  text,
  placeholder,
  questionHolder,
}: AddTextTableProps) {
  const { AddText, handleAddText, setAddText } = useAddText("");
  const { handleDeletePickList } = useDeletePickList();
  questionHolder(AddText);

  useEffect(() => {
    setAddText(questions);
  }, []);

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
