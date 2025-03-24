import { ChevronDownIcon } from "@chakra-ui/icons";
import useComboBoxSelection from "../../hooks/useComboBoxSelection";
import {
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { PageLayout } from "../../pages/Execution/subcomponents/LayoutFactory";

interface IComboBoxProps {
  text: string;
  options: string[];
  isDisabled: boolean;
  onOptionchange?: (option: string, isChecked: boolean) => void;
  page: PageLayout
}

export default function ComboBox({
  text,
  options,
  isDisabled,
  onOptionchange,
  page,
}: IComboBoxProps) {
  const { handleIncludeItemClick, handleExcludeItemClick } =
    useComboBoxSelection({page});

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
        border={
          text === "Include"
            ? "2px solid #6B8E23"
            : text === "Exclude"
            ? "2px solid #8B0000"
            : text === "filter options"
            ? "2px solid #CFE2F3"
            : "#2F3E52"
        }
        as={Button}
        _hover={{
          bg:
            text === "Include"
              ? "white"
              : text === "Exclude"
              ? "white"
              : text === "filter options"
              ? "#CFE2F3"
              : "#2F3E52",
          color:
            text === "Include"
              ? "#6B8E23"
              : text === "Exclude"
              ? "#8B0000"
              : text === "filter options"
              ? "#CFE2F3"
              : "#2F3E52",
          transition: "0.2s ease-in-out",
        }}
        transition="0.2s ease-in-out"
        boxShadow="md"
        rightIcon={<ChevronDownIcon fontSize="1.5rem" />}
        w={"7.5rem"}
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
