import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import Styles from './AccordionNavItem.module.css';
// import { ImExit } from "react-icons/im";
// import { FiPlusCircle } from "react-icons/fi";
// import { ImBooks } from "react-icons/im";

interface Props {
    to: string;
    text: string;
    icon: React.ReactNode;
}

const ProtocolAccordionSubItem = ({to, text, icon}: Props) => {
  return (
    <Box w='10rem' display='flex' className={Styles.accordionNavlinkBox} gap=".5rem">
      {icon}
      <Link className={Styles.accordionLink} to={to}>{text}</Link>
    </Box>
  )
}

export default ProtocolAccordionSubItem;