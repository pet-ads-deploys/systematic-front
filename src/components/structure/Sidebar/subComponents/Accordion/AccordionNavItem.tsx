// External library
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Styles
import Styles from "./AccordionNavItem.module.css";

// Types
interface Props {
  to: string;
  text: string;
  icon?: React.ReactNode;
}

// Hooks
import useActiveSection from "@features/shared/hooks/useActiveSection";

const ProtocolAccordionSubItem = ({ to, text, icon }: Props) => {
  const { pathname } = useActiveSection();
  const isActive = pathname === to;

  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      className={Styles.accordionNavlinkBox}
      gap=".75rem"
      bg={isActive ? "#dadada" : "transparent"}
      borderRadius=".25rem"
    >
      {icon}
      <Link
        className={Styles.accordionLink}
        to={to}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          textDecoration: "none",
          color: isActive ? "black" : "#272927",
          fontWeight: isActive ? "bold" : "normal",
          flex: 1,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "100%",
            minHeight: "1rem",
            borderLeft: isActive ? "2px solid black" : "2px dashed #272927",
          }}
        />
        {text}
      </Link>
    </Box>
  );
};

export default ProtocolAccordionSubItem;
