import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import SelectInput from "../../../../../../../../components/common/inputs/SelectInput";

import EventButton from "@components/common/buttons/EventButton";
import { useSelect } from "../../../../../services/useSelect";
import { conteiner, formcontrol } from "./styles";
import InfosTable from "@features/review/planning-protocol/pages/StepThree/subcomponents/tables/InfosTable";
import { capitalize } from "@features/shared/utils/helpers/formatters/CapitalizeText";

interface AddSelectTableProps {
  options: string[];
  placeholder: string;
  typeField: string;
  label: string;
}

export default function AddSelectTable({
  options,
  label,
  placeholder,
}: AddSelectTableProps) {
  const {
    selectedValue,
    selectedValues,
    handleSelectChange,
    handleSelectAddButtonClick,
    handleDeleteSelect,
  } = useSelect([], label);

  const formattedOptions = options.map((opt) => capitalize(opt.toLowerCase()));

  const formatSelectedValues = selectedValues.map((value) =>
    capitalize(value.toLowerCase())
  );

  return (
    <FormControl sx={conteiner} alignContent={"center"}>
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <FormLabel fontWeight={500} fontSize={"large"}>
          {label}
        </FormLabel>
        <FormControl sx={formcontrol} justifyContent="space-between">
          <SelectInput
            values={options}
            names={formattedOptions}
            onSelect={handleSelectChange}
            selectedValue={selectedValue}
            placeholder={placeholder}
            page={"protocol"}
          />
        </FormControl>
      </Box>
      <EventButton text="Add" event={handleSelectAddButtonClick} w={"2%"} />
      <InfosTable
        typeField="select"
        onDeleteAddedText={(index) => handleDeleteSelect(index)}
        AddTexts={formatSelectedValues}
        context={label}
      />
    </FormControl>
  );
}
