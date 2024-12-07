import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import Style from './Sidebar.module.css';
import CloseButton from './subComponents/CloseButton';
import Navigation from './Navigation';

interface Props {
  type: string
}

const Sidebar = ({type}: Props) => {
  const [isOpen, setIsOpen] = useState(true);
 
  return (
    <motion.div 
      className={ isOpen ? Style.wrapper : Style.collapsed}
      animate={{
        width: isOpen ? '250px' : '60px',
        borderRadius: isOpen ? '30px' : '50%'
      }}
      transition={{ type: 'just', duration: 0.3 }}
    >
      {isOpen ?
      ( 
      <>
        <Box className={Style.closeBtn}>
            <CloseButton handleToggle={() => setIsOpen(!isOpen)} />
        </Box>

        <Navigation type={type}/> 
      </>) :

        (
          <CloseButton className={Style.collapsedBtn} handleToggle={() => setIsOpen(!isOpen)} />
        )
      }
    </motion.div>
  )
}

export default Sidebar;