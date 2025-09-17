// External library
import { Box, Text, Tooltip } from "@chakra-ui/react";

// Styles
import { conteiner, titleSX } from "./CardInfosStyle";

// Types
interface ICardInfosProps {
  title: string;
  id: string;
}

export default function CardInfos({ title, id }: ICardInfosProps) {
  return (
    <Box sx={conteiner}>
      <Tooltip
        label={title}
        aria-label="Título completo"
        hasArrow
        placement="right"
        fontSize="xs"
        p={3}
      >
        <Text sx={titleSX}>{title}</Text>
      </Tooltip>
      <div
        style={{
          color: "#8D918D",
        }}
      >
        #{id}
      </div>
    </Box>
  );
}
