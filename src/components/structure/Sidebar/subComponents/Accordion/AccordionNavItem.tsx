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

const ProtocolAccordionSubItem = ({ to, text, icon }: Props) => {
  return (
    <Box
      w="10rem"
      display="flex"
      className={Styles.accordionNavlinkBox}
      gap=".5rem"
    >
      {icon}
      <Link className={Styles.accordionLink} to={to}>
        {text}
      </Link>
    </Box>
  );
};

export default ProtocolAccordionSubItem;
