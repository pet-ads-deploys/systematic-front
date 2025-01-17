import { Box, Heading, Tooltip } from "@chakra-ui/react";
import { container, header } from "./headerFormStyles";

interface HeaderFormProps {
  text: string;
}

export default function HeaderForm({ text }: HeaderFormProps) {

  const handleDesactiveTooltip = (text: string) => {
    const MAX_VALUE: number = 100;
    return text.length <= MAX_VALUE;
  }

  return (
     <Box sx={container}>
      <Tooltip label={text} isDisabled={handleDesactiveTooltip(text)} p="1rem">
        <Heading sx={header} >{text}</Heading>
      </Tooltip>
    </Box>
  );
}
