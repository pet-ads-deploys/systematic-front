import React from 'react';
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
  return (
    <motion.div className={Style.wrapper}>
      <Box className={Style.closeBtn}>
          <CloseButton />
      </Box>

      <Navigation type={type}/>
    </motion.div>
  )
}

export default Sidebar;