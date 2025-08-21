import Sidebar from "../Sidebar/Sidebar";
import { useContext } from "react";
import { boxStyles, flexStyles } from "./FlexStyle";
import { Box } from "@chakra-ui/react";
import AppContext from "@features/shared/context/ApplicationContext";

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

  const templateColumns = sidebarState === "open" ? "16rem 1fr" : "0px 1fr";
  const contentMargin = sidebarState === "open" ? "1.5rem" : "0.5rem";

  return (
    <Box sx={{ ...flexStyles, gridTemplateColumns: templateColumns }}>
      <Sidebar type={navigationType} />
      <Box sx={{ ...boxStyles, marginLeft: contentMargin }}>
        {children}
      </Box>
    </Box>
  );
}