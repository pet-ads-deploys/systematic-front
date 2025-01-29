import { Button, Flex } from "@chakra-ui/react";
import { BsArrowsFullscreen, BsLayoutSplit } from "react-icons/bs";
import { PiSquareSplitVerticalLight } from "react-icons/pi";

interface ButtonsLayoutProps {
    handleHorizontalLayout: () => void;
    handleVerticalLayout: () => void;
    handleDefaultLayout: () => void;
}
 
export default function ButtonsLayout({handleDefaultLayout,handleHorizontalLayout,handleVerticalLayout}: ButtonsLayoutProps){
  return (
    <Flex
      w="100%"
      justifyContent="end"
      alignContent="center"
      gap="1.5rem"
    >
      <Button w="3rem" borderRadius=".5rem" onClick={handleHorizontalLayout}>
        <BsLayoutSplit color="black" size="1.25rem" />
      </Button>
      <Button w="3rem" borderRadius=".5rem" onClick={handleVerticalLayout}>
        <PiSquareSplitVerticalLight color="black" size="1.5rem" />
      </Button>
      <Button w="3rem" borderRadius=".5rem" onClick={handleDefaultLayout}>
        <BsArrowsFullscreen color="black" size="1rem" />
      </Button>
    </Flex>
  );
}
