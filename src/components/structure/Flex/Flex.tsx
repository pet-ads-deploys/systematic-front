// External library
import React from "react";
import { useContext } from "react";
import { Box } from "@chakra-ui/react";

// Context
import AppContext from "@features/shared/context/ApplicationContext";

// Components
import Sidebar from "../Sidebar/Sidebar";

// Styles
import { flexStyles, contentGridStyles } from "./styles";

// Types
interface iFlexLayout {
  navigationType: string;
  children: React.ReactNode;
}

export default function FlexLayout({ navigationType, children }: iFlexLayout) {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }
  const { sidebarState } = context;

  const templateColumns = sidebarState === "open" ? "14rem 1fr" : "0px 1fr";
  const contentMargin = sidebarState === "open" ? "1.5rem" : "0.5rem";

  const childrenArray = React.Children.toArray(children);
  const header = childrenArray[0];
  const mainContent = childrenArray.slice(1);

  return (
    <Box
      sx={{
        ...flexStyles,
        gridTemplateColumns: templateColumns,
        gridTemplateRows: "1fr", // 1 linha que ocupa toda altura
        height: "100vh",         // garante altura cheia da tela
      }}
    >
      {/* Sidebar ocupa altura toda */}
      <Sidebar type={navigationType} />

      <Box
        sx={{
          ...contentGridStyles,
          marginLeft: contentMargin,
          height: "100%", // ocupa altura cheia também
          display: "grid",
          gridTemplateRows: "auto 1fr", // header (auto) + conteúdo flexível
        }}
      >
        {/* Header em cima */}
        <Box
          gridColumn="1 / -1"
          gridRow="1"
          sx={
            sidebarState === "collapsed"
              ? { paddingLeft: "4rem" }
              : { paddingLeft: "1rem" }
          }
        >
          {header}
        </Box>

        {/* Conteúdo ocupa o restante da altura */}
        <Box
          gridColumn="1 / -1"
          gridRow="2"
          height="100%"
          overflow="auto" // evita quebrar layout se o conteúdo for muito grande
        >
          {mainContent}
        </Box>
      </Box>
    </Box>
  );
}
