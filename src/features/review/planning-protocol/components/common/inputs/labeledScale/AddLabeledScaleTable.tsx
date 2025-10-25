import { FormControl, FormLabel } from "@chakra-ui/react";
import AddLabeledListField from "./AddLabeledScaleField";
import {
  formcontrol,
  label,
} from "@features/review/planning-protocol/components/common/inputs/text/AddTextTable/styles";
import { SetStateAction, useEffect } from "react";
import { useAddLabeledList } from "@features/review/planning-protocol/hooks/useAddLabeledList";
import { handleDeleteLabeledList } from "@features/review/planning-protocol/hooks/useDeleteLabeledList";
import InfosLabeled from "@features/review/planning-protocol/components/common/tables/LabeledScaleTable";

interface AddTextTableProps {
  text: string;
  placeholder: string;
  questionHolder: React.Dispatch<SetStateAction<Record<string, number>>>;
  questions: Record<string, number>;
}

export default function AddLabeledScaleTable({
  text,
  placeholder,
  questionHolder,
  questions,
}: AddTextTableProps) {
  const { AddText, handleAddText, setAddText } = useAddLabeledList();
  questionHolder(AddText);

  useEffect(() => {
    if (questions) setAddText(questions);
  }, []);

  return (
    <FormControl sx={label}>
      <FormLabel>{text}</FormLabel>

      <FormControl sx={formcontrol}>
        <AddLabeledListField onAddText={handleAddText} text={placeholder} />
        <InfosLabeled
          typeField={""}
          onDeleteAddedText={(label: string) =>
            handleDeleteLabeledList(label, setAddText)
          } // Passa o label em vez do index
          AddTexts={AddText}
        />
      </FormControl>
    </FormControl>
  );
}
