import Sidebar from "../Sidebar/Sidebar";

import { boxStyles, flexStyles, style } from "./FlexStyle";
import { Flex, Box } from "@chakra-ui/react";

interface iFlexLayout {
  navigationType: string;
  children: React.ReactElement | React.ReactElement[];
  defaultOpen?: number;
}

export default function FlexLayout({ navigationType, children }: iFlexLayout) {
  return (
    <Flex sx={flexStyles}>
      <Sidebar type={navigationType} />
      <Box sx={{ ...style, ...boxStyles }}>{children}</Box>
    </Flex>
  );
}
