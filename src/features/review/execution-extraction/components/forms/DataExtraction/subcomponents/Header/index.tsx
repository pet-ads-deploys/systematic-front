// External library
import { Box, Heading } from "@chakra-ui/react";

// Utils
import { capitalize } from "@features/shared/utils/helpers/formatters/CapitalizeText";

// Styles
import { container, header } from "./styles";

// Types
interface HeaderFormProps {
  text: string;
}

export default function HeaderForm({ text }: HeaderFormProps) {
  return (
    <Box sx={container}>
      <Heading sx={header}>{capitalize(text)}</Heading>
    </Box>
  );
}
