import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { JSX } from "react";
import { FiChevronDown } from "react-icons/fi";

type CheckboxDropdownProps = {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  icon?: JSX.Element;
};

export default function CheckboxDropdown({
  label,
  options,
  selected,
  onToggle,
  icon,
}: CheckboxDropdownProps) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<FiChevronDown />}
        leftIcon={icon}
        bg={"white"}
      >
        {label}
      </MenuButton>
      <MenuList maxH="200px" overflowY="auto" p="2" bg="white" zIndex="2000">
        {options.map((option) => (
          <MenuItem key={option} closeOnSelect={false}>
            <Checkbox
              isChecked={selected.includes(option)}
              onChange={() => onToggle(option)}
            >
              {option}
            </Checkbox>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
