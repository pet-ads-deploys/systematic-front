// External Library
import React from "react";
import { Box, FormControl, FormControlProps } from "@chakra-ui/react";

// Components
import FlexLayout from "@components/structure/Flex/Flex";
import Header from "@components/structure/Header/Header";
import CardDefault from "@components/common/cards";

// Types
interface ProtocolFormLayoutProps {
  headerText: string;
  children: React.ReactNode;
  navButtons: React.ReactNode;
  formControlProps?: FormControlProps;
}

export default function ProtocolFormLayout({
  headerText,
  children,
  navButtons,
  formControlProps = {},
}: ProtocolFormLayoutProps) {
  const baseFormControlStyles = {
    m: "20px auto 0",
    display: "flex",
    gap: 10,
    flexDir: "column" as const,
    w: "60vw",
    alignItems: "center",
    flexGrow: 1,
  };

  return (
    <FlexLayout navigationType="Accordion">
      <Header text={headerText} />
      <CardDefault
        backgroundColor="#fff"
        borderRadius="1rem"
        withShadow={false}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          h="88%"
          overflowY={"auto"}
          overflowX={"hidden"}
        >
          <FormControl
            {...baseFormControlStyles}
            {...formControlProps}
            minW={0}
            w="100%"
            gap="2rem"
          >
            {children}
          </FormControl>
        </Box>
        <Box
          w={"75%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
          pt={"0.5rem"}
          mb={4}
          mx={"auto"}
        >
          {navButtons}
        </Box>
      </CardDefault>
    </FlexLayout>
  );
}
