import { Box, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import Styles from './NavItem.module.css';
import { ImExit } from "react-icons/im";
import { FiPlusCircle } from "react-icons/fi";
import { ImBooks } from "react-icons/im";

interface Props {
    to: string;
    text: string
}

const NavItem = ({to, text}: Props) => {
  return (
    <Box w='116px' display='flex' className={Styles.linksBox}>
      {to == '/newReview' && <Icon boxSize='20px' mr='7px' as={FiPlusCircle} color='#c9d9e5'/>}
      {to == '/user' && <Icon boxSize='21' mr='7px' as={ImBooks} color='#c9d9e5' />}
      {to == '/' && <Icon boxSize='21px' mr='7px' as={ImExit} color='#c9d9e5'/>}
      <Link className={Styles.link} to={to}>{text}</Link>
    </Box>
  )
}

export default NavItem