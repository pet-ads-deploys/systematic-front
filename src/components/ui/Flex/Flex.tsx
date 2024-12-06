import { style } from "./FlexStyle";
import Sidebar from "../../Sidebar/Sidebar";
import { Flex, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";


interface iFlexLayout {
  navigationType: string;
  children: React.ReactElement | React.ReactElement[];
  defaultOpen: number;
}

export default function FlexLayout({ navigationType, children, defaultOpen }: iFlexLayout) {
  return (
    <Flex direction={"row"} justify={"space-between"} w={"100%"} alignItems={"center"} bgColor={"#DDE4E9"}>
      <Sidebar type={navigationType}/>
      <Box sx={style} w={"100%"} h={"100vh"} overflow={"auto"}>
        {children}
      </Box>
    </Flex>
  );
}
