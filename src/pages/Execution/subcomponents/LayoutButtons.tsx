import { Button, Flex } from "@chakra-ui/react";

import { BsTable } from "react-icons/bs";
import {
  PiArticleMediumBold,
  PiSquareSplitHorizontalFill,
  PiSquareSplitVerticalFill,
} from "react-icons/pi";

import { ViewModel } from "../../../hooks/useLayoutPage";

interface ButtonsLayoutProps {
  layout: ViewModel;
  handleChangeLayout: (newLayout: ViewModel) => void;
}

export default function ButtonsLayout({
  layout,
  handleChangeLayout,
}: ButtonsLayoutProps) {
  const buttonLayout = {
    boxShadow: "md",
    p: "1rem",
    transition: "0.2s ease-in-out",
    w: "3.25rem",
    borderRadius: ".5rem",
  };

  const buttons = [
    {
      layoutType: "table",
      icon: <BsTable size="3rem" />,
    },
    {
      layoutType: "vertical",
      icon: <PiSquareSplitVerticalFill size="3rem" />,
    },
    {
      layoutType: "horizontal",
      icon: <PiSquareSplitHorizontalFill size="3rem" />,
    },
    {
      layoutType: "article",
      icon: <PiArticleMediumBold size="3rem" />,
    },
  ];

  return (
    <Flex w="20rem" justifyContent="end" alignItems="center" gap="1.5rem">
      {buttons.map((element, index) => (
        <Button
          key={index}
          onClick={() => handleChangeLayout(element.layoutType as ViewModel)}
          bg={layout == element.layoutType ? "#263C56" : "white"}
          color={layout == element.layoutType ? "white" : "#263C56"}
          sx={buttonLayout}
        >
          {element.icon}
        </Button>
      ))}
    </Flex>
  );
}
