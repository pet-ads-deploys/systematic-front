import { ChevronDownIcon } from "@chakra-ui/icons";
import useComboBoxSelection from "../../hooks/useComboBoxSelection";
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

interface IComboBoxProps {
  text: string;
  options: string[];
  isDisabled: boolean;
}

export default function ComboBox({ text, options, isDisabled }: IComboBoxProps) {
  const { handleIncludeItemClick, handleExcludeItemClick } = useComboBoxSelection();

  return (
    <Menu closeOnSelect={false}>

      <MenuButton 
      bgColor={text === 'Include' ? '#6B8E23' :
        text === 'Exclude' ? '#8B0000' :
        text === 'filter options' ? '#303D50' :
        '#303D50'} 
      color={"#ffff"} 
      borderRadius={"6px"} 
      as={Button} 
      rightIcon={<ChevronDownIcon />} 
      w={"50%"}>
        {text}
      </MenuButton>

      <MenuList>
        {options.map((option, index) => (
          <MenuItem key={index}>

            { text == 'Include' ?
            <Checkbox isDisabled={isDisabled} onChange={(e) => handleIncludeItemClick(e.target.checked)}>
              {option}
            </Checkbox> 
              : 
            <Checkbox isDisabled={isDisabled} onChange={(e) => handleExcludeItemClick(e.target.checked)}>
              {option}
            </Checkbox>
            }

          </MenuItem>
        ))}
      </MenuList>

    </Menu>
  );
}
