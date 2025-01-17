import { ChevronDownIcon } from "@chakra-ui/icons";
import useComboBoxSelection from "../../hooks/useComboBoxSelection";
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

interface IComboBoxProps {
  text: string;
  options: string[];
  isDisabled: boolean;
  onOptionchange?: (option: string, isChecked: boolean) => void;
}

export default function ComboBox({ text, options, isDisabled, onOptionchange }: IComboBoxProps) {
  const { handleIncludeItemClick, handleExcludeItemClick } = useComboBoxSelection();

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        bgColor={
          text === "Include"
            ? "#6B8E23"
            : text === "Exclude"
            ? "#8B0000"
            : text === "filter options"
            ? "#EBF0F3"
            : "#303D50"
        }
        color={text === "filter options" ? "#2E4B6C" : "#ffff"}
        borderRadius={"6px"}
        as={Button}
        rightIcon={<ChevronDownIcon />}
        w={"10rem"}
      >
        {text}
      </MenuButton>

      <MenuList>
        {options.map((option, index) => (
          <MenuItem key={index}>
            {text === "Include" ? (
              <Checkbox
                isDisabled={isDisabled}
                onChange={(e) => handleIncludeItemClick(e.target.checked)}
              >
                {option}
              </Checkbox>
            ) : text === "Exclude" ? (
              <Checkbox
                isDisabled={isDisabled}
                onChange={(e) => handleExcludeItemClick(e.target.checked)}
              >
                {option}
              </Checkbox>
            ) : text === "filter options" && onOptionchange ? (
              <Checkbox
                isDisabled={isDisabled}
                onChange={(e) => onOptionchange?.(option, e.target.checked)}
              >
                {option}
              </Checkbox>
            ) : (
              <Checkbox isDisabled={isDisabled}>{option}</Checkbox>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
