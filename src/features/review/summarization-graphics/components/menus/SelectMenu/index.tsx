import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

type SelectMenuProps<T> = {
  options: T[];                  
  selected?: T;                 
  onSelect: (option: T) => void;  
  getLabel?: (option: T) => string;
  getKey?: (option: T) => string | number;
  placeholder?: string;  
};

export default function SelectMenu<T>({
  options,
  selected,
  onSelect,
  getLabel = (o) => String(o),
  getKey = (o) => String(o),
  placeholder = "Choose option",
}: SelectMenuProps<T>) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="gray.200"
        color="gray.600"
        rightIcon={<FiChevronDown />}
      >
        {selected ? getLabel(selected) : placeholder}
      </MenuButton>
      <MenuList maxHeight="300px" overflowY="auto">
        {options.map((option) => (
          <MenuItem key={getKey(option)} onClick={() => onSelect(option)}>
            {getLabel(option)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
