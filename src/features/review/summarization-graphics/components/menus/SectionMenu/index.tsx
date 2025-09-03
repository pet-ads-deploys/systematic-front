import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

type MenuProps = {
  onSelect: (section: string) => void;
  selected: string;
};

export default function SectionMenu({ onSelect, selected }: MenuProps) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="gray.200"
        color="gray.600"
        rightIcon={<FiChevronDown/>}
      >
        {selected || "Choose Section"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelect("Search Sources")}>
          Search Sources
        </MenuItem>

        <MenuGroup title="First Selection">
          <MenuItem onClick={() => onSelect("S1_Inclusion Criteria")}>
            Inclusion Criteria
          </MenuItem>
          <MenuItem onClick={() => onSelect("S1_Exclusion Criteria")}>
            Exclusion Criteria
          </MenuItem>
        </MenuGroup>

        <MenuGroup title="Second Selection">
          <MenuItem onClick={() => onSelect("S2_Inclusion Criteria")}>
            Inclusion Criteria
          </MenuItem>
          <MenuItem onClick={() => onSelect("S2_Exclusion Criteria")}>
            Exclusion Criteria
          </MenuItem>
        </MenuGroup>

        <MenuDivider />

        <MenuItem onClick={() => onSelect("Studies Funnel")}>
          Studies Funnel
        </MenuItem>
        <MenuItem onClick={() => onSelect("Included Studies")}>
          Included Studies
        </MenuItem>
        <MenuItem onClick={() => onSelect("Form Questions")}>
          Form Questions
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
