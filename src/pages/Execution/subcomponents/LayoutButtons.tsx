import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { BsTable } from "react-icons/bs";
import {
  PiArticleMediumBold,
  PiSquareSplitHorizontalFill,
  PiSquareSplitVerticalFill,
} from "react-icons/pi";

import { ViewModel } from "../../../hooks/useLayoutPage";

import React from "react";
import { capitalize } from "../../../utils/CapitalizeText";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface SelectLayoutProps {
  handleChangeLayout: (newLayout: ViewModel) => void;
}

export default function SelectLayout({
  handleChangeLayout,
}: SelectLayoutProps) {
  const buttons: Record<
    ViewModel,
    {
      layoutType: ViewModel;
      icon: React.ReactNode;
    }
  > = {
    table: {
      layoutType: "table",
      icon: <BsTable size="1rem" color="black" />,
    },
    horizontal: {
      layoutType: "horizontal",
      icon: <PiSquareSplitVerticalFill size="1rem" color="black" />,
    },
    vertical: {
      layoutType: "vertical",
      icon: <PiSquareSplitHorizontalFill size="1rem" color="black" />,
    },
    article: {
      layoutType: "article",
      icon: <PiArticleMediumBold size="1rem" color="black" />,
    },
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        w="24rem"
        bg="#EBF0F3"
        color="#2E4B6C"
        fontWeight="light"
        display="flex"
      >
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Box>Choose layout</Box>
          <ChevronDownIcon fontSize="1.25rem" />
        </Flex>
      </MenuButton>
      <MenuList bg={"#EBF0F3"} color="#2E4B6C">
        {Object.values(buttons).map((element, index) => (
          <MenuItem
            key={index}
            onClick={() => handleChangeLayout(element.layoutType)}
          >
            <Flex align="center" gap="1rem" w="inherit">
              {element.icon}
              {capitalize(element.layoutType)}
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
