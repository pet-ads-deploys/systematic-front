import { Button, Flex } from "@chakra-ui/react";

import { MdVerticalSplit } from "react-icons/md";
import { BsTable } from "react-icons/bs";
import { PiArticleMediumBold } from "react-icons/pi";

import { ViewModel } from "../Selection/Selection";

interface ButtonsLayoutProps {
  layout: ViewModel;
  handleTableLayoutChange: () => void;
  handleVerticalLayoutChange: () => void;
  handleArticleLayoutChange: () => void;
}

export default function ButtonsLayout({
  handleArticleLayoutChange,
  handleTableLayoutChange,
  handleVerticalLayoutChange,
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
        onClick={handleVerticalLayoutChange}
        bg={layout == "vertical" ? "#263C56" : "white"}
        sx={buttonLayout}
      >
        <BsTable
          color={layout == "vertical" ? "white" : "#263C56"}
          size="2rem"
        />
      </Button>
      <Button
        onClick={handleTableLayoutChange}
        bg={layout == "table" ? "#263C56" : "white"}
        sx={buttonLayout}
      >
        <MdVerticalSplit
          color={layout == "table" ? "white" : "#263C56"}
          size="2rem"
        />
      </Button>
      <Button
        onClick={handleArticleLayoutChange}
        bg={layout == "article" ? "#263C56" : "white"}
        sx={buttonLayout}
        // transform="rotate(0.5turn)"
      >
        <PiArticleMediumBold
          color={layout == "article" ? "white" : "#263C56"}
          size="2rem"
        />
      </Button>
    </Flex>
  );
}
