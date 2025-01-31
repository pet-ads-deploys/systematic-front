import { border, Button, Flex } from "@chakra-ui/react";
import { BsArrowsFullscreen, BsLayoutSplit } from "react-icons/bs";
import { PiSquareSplitVerticalLight } from "react-icons/pi";
import { LayoutModel } from "../Selection";

interface ButtonsLayoutProps {
  layout: LayoutModel;
  handleHorizontalLayout: () => void;
  handleVerticalLayout: () => void;
  handleDefaultLayout: () => void;
}

export default function ButtonsLayout({
  handleDefaultLayout,
  handleHorizontalLayout,
  handleVerticalLayout,
  layout,
}: ButtonsLayoutProps) {
  const buttonLayout = {
    boxShadow: "md",
    p: "1rem",
    transition: "0.2s ease-in-out",
    w: "3rem",
    borderRadius: ".5rem",
  };
  return (
    <Flex w="100%" justifyContent="end" alignItems="center" gap="1.5rem">
      <Button
        onClick={handleHorizontalLayout}
        bg={layout.orientation === "horizontal" ? "#263C56" : "white"}
        sx={buttonLayout}
      >
        <BsLayoutSplit
          color={layout.orientation === "horizontal" ? "white" : "#263C56"}
          size="1.25rem"
        />
      </Button>
      <Button
        onClick={handleVerticalLayout}
        bg={layout.orientation === "vertical" ? "#263C56" : "white"}
        sx={buttonLayout}
      >
        <PiSquareSplitVerticalLight
          color={layout.orientation === "vertical" ? "white" : "#263C56"}
          size="1.5rem"
        />
      </Button>
      <Button
        onClick={handleDefaultLayout}
        bg={layout.orientation === "default" ? "#263C56" : "white"}
        sx={buttonLayout}
      >
        <BsArrowsFullscreen
          color={layout.orientation === "default" ? "white" : "#263C56"}
          size="1rem"
        />
      </Button>
    </Flex>
  );
}
