import { Box, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import Styles from './AccordionNavItem.module.css';
import { ImExit } from "react-icons/im";
import { FiPlusCircle } from "react-icons/fi";
import { ImBooks } from "react-icons/im";

interface Props {
    to: string;
    text: string
}

const ProtocolAccordionSubItem = ({to, text}: Props) => {
  return (
    <Box w='120px' display='flex' className={Styles.accordionNavlinkBox}>
      <Icon color='#c9d9e5' />
      <Link className={Styles.accordionLink} to={to}>{text}</Link>
    </Box>
  )
}

export default ProtocolAccordionSubItem;