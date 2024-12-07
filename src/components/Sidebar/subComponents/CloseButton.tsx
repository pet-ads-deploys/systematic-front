import { CloseIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React from 'react'

const CloseButton = () => {
  return (
    <Button w='0.2em' borderRadius='50%' bgColor='#263C56' _hover={{bgColor: "#263C56"}}>
        <CloseIcon color='#c9d9e5' />
    </Button>
  )
}

export default CloseButton;