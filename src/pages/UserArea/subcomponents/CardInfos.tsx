import { Box, Text, Tooltip  } from "@chakra-ui/react";
import { conteiner, text, titleSX } from "../styles/CardInfosStyle";

interface ICardInfosProps {
  title: string;
  RevisorNames: string[];
}

export default function CardInfos({ title, RevisorNames }: ICardInfosProps) {
  return (
    <Box sx={conteiner}>
      <Tooltip
        label={title}
        aria-label="Título completo"
        hasArrow
        placement="right" // Pode ser "top", "bottom", "left", "right"
        fontSize="xs" // Tamanho da fonte
        p={3} // Padding do tooltip>
      >
        <Text sx={titleSX}>{title}</Text>
      </Tooltip>
      <Text sx={text}> Reviewers: {RevisorNames} </Text>
    </Box>
  );
}
