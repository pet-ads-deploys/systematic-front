// External libraries
import { Button, Flex } from "@chakra-ui/react";

// Icons
import { MdHorizontalSplit, MdVerticalSplit } from "react-icons/md";

// Types
import { LayoutModel } from "../Selection/Selection";
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
    w: "3.25rem",
    borderRadius: ".5rem",
  };
  return (
    <Flex w="100%" justifyContent="end" alignItems="center" gap="1.5rem">
      <Button
        onClick={handleHorizontalLayout}
        bg={layout.orientation === "horizontal" ? "#263C56" : "white"}
        sx={buttonLayout}
      >
        <MdVerticalSplit
          color={layout.orientation === "horizontal" ? "white" : "#263C56"}
          size="2rem"
        />
      </Button>
      <Button
        onClick={handleVerticalLayout}
        bg={layout.orientation === "vertical" ? "#263C56" : "white"}
        sx={buttonLayout}
      >
        <MdHorizontalSplit
          color={layout.orientation === "vertical" ? "white" : "#263C56"}
          size="2rem"
        />
      </Button>
      <Button
        onClick={handleDefaultLayout}
        bg={layout.orientation === "default" ? "#263C56" : "white"}
        sx={buttonLayout}
        transform="rotate(0.5turn)"
      >
        <MdHorizontalSplit
          color={layout.orientation === "default" ? "white" : "#263C56"}
          size="2rem"
        />
      </Button>
    </Flex>
  );
}
