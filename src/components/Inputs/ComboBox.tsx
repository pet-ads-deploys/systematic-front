// External libraries
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
import { RiMenuAddFill } from "react-icons/ri";
import { MdOutlinePlaylistRemove } from "react-icons/md";

// Hooks
import useComboBoxSelection from "../../hooks/useComboBoxSelection";

// Types
import { PageLayout } from "../../pages/Execution/subcomponents/LayoutFactory";
import {
  OptionProps,
  OptionType,
} from "../../hooks/fetch/useFetchAllCriteriasByArticle";

interface IComboBoxProps {
  text: string;
  options: OptionProps[];
  isDisabled: boolean;
  onOptionchange?: (option: string, isChecked: boolean) => void;
  page: PageLayout;
  groupKey: OptionType;
  handlerUpdateCriteriasStructure: (
    key: OptionType,
    optionText: string,
    newValue: boolean
  ) => void;
}

export default function ComboBox({
  text,
  options,
  isDisabled,
  onOptionchange,
  page,
  groupKey,
  handlerUpdateCriteriasStructure,
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
                isChecked={option.isChecked}
                onChange={(e) => {
                  const newValue = e.target.checked;

                  handlerUpdateCriteriasStructure(
                    groupKey,
                    option.text,
                    newValue
                  );

                  const updatedList = options.map((item) =>
                    item.text === option.text
                      ? { ...item, isChecked: newValue }
                      : item
                  );

                  handleIncludeItemClick(
                    newValue,
                    updatedList
                      .filter((data) => data.isChecked == true)
                      .map((item) => item.text)
                  );
                }}
              >
                <Tooltip
                  label={option.text}
                  aria-label="Full criteria"
                  p="1rem"
                  hasArrow
                >
                  <Text isTruncated maxW="20rem">
                    {option.text}
                  </Text>
                </Tooltip>
              </Checkbox>
            ) : text === "Exclude" ? (
              <Checkbox
                isDisabled={isDisabled}
                isChecked={option.isChecked}
                onChange={(e) => {
                  const newValue = e.target.checked;

                  handlerUpdateCriteriasStructure(
                    groupKey,
                    option.text,
                    newValue
                  );

                  const updatedList = options.map((item) =>
                    item.text === option.text
                      ? { ...item, isChecked: newValue }
                      : item
                  );

                  handleExcludeItemClick(
                    newValue,
                    updatedList
                      .filter((data) => data.isChecked == true)
                      .map((item) => item.text)
                  );
                }}
              >
                <Tooltip
                  label={option.text}
                  aria-label="Full criteria"
                  p="1rem"
                  hasArrow
                >
                  <Text isTruncated maxW="20rem">
                    {option.text}
                  </Text>
                </Tooltip>
              </Checkbox>
            ) : text === "filter options" && onOptionchange ? (
              <Checkbox
                isDisabled={isDisabled}
                onChange={(e) =>
                  onOptionchange?.(option.text, e.target.checked)
                }
              >
                {option.text}
              </Checkbox>
            ) : (
              <Checkbox isDisabled={isDisabled}>{option.text}</Checkbox>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
