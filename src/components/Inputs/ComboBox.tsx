import useComboBoxSelection from "../../hooks/useComboBoxSelection";
import {
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { PageLayout } from "../../pages/Execution/subcomponents/LayoutFactory";
import { RiMenuAddFill } from "react-icons/ri";
import { MdOutlinePlaylistRemove } from "react-icons/md";

interface IComboBoxProps {
  text: string;
  options: string[];
  isDisabled: boolean;
  onOptionchange?: (option: string, isChecked: boolean) => void;
  page: PageLayout;
  selectedItems: string[];
}

export default function ComboBox({
  text,
  options,
  isDisabled,
  onOptionchange,
  page,
}: IComboBoxProps) {
  const { handleIncludeItemClick, handleExcludeItemClick } =
    useComboBoxSelection({ page });

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
        color="black"
      >
        {text === "Include" ? (
          <RiMenuAddFill size="1.5rem" />
        ) : (
          <MdOutlinePlaylistRemove size="2rem" />
        )}
      </MenuButton>

      <MenuList maxH="10rem" overflowY="auto">
        {options.map((option, index) => (
          <MenuItem key={index} maxW="25rem" overflow="auto">
            <Checkbox
              isDisabled={isDisabled}
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (text === "Include") {
                  handleIncludeItemClick(option, isChecked);
                } else if (text === "Exclude") {
                  handleExcludeItemClick(option, isChecked);
                } else if (text === "filter options" && onOptionchange) {
                  onOptionchange(option, isChecked);
                }
              }}
            >
              <Tooltip
                label={option}
                aria-label="Full criteria"
                p="1rem"
                hasArrow
              >
                <Text isTruncated maxW="20rem">
                  {option}
                </Text>
              </Tooltip>
            </Checkbox>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
