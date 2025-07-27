import { useState } from "react";
import { DarkText, LightText } from "./styles";
import { DarkBackground, LightBackground } from "./styles";
import { Box, Text } from "@chakra-ui/react";

enum LinkTypeEnum {
  GoToOtherPage = "GoToOtherPage",
  StayInSamePage = "StayInSamePage",
}

interface IHeaderLink {
  text: string;
  id: string;
  type: LinkTypeEnum;
}

export default function HeaderLink({ text, id, type }: IHeaderLink) {
  const [onHover, setOnHover] = useState(false);

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href={`#${id}`}
      onClick={
        type === LinkTypeEnum.StayInSamePage ? handleAnchorClick : undefined
      }
    >
      <Box
        sx={onHover ? DarkBackground : LightBackground}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <Text sx={onHover ? DarkText : LightText}>{text}</Text>
      </Box>
    </a>
  );
}
