// import { ChevronDownIcon } from "@chakra-ui/icons";
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
            {text === "Include" ? (
              <Checkbox
                isDisabled={isDisabled}
                onChange={(e) => handleIncludeItemClick(e.target.checked)}
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
            ) : text === "Exclude" ? (
              <Checkbox
                isDisabled={isDisabled}
                onChange={(e) => handleExcludeItemClick(e.target.checked)}
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
