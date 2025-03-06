import { Box, Heading, Tooltip } from "@chakra-ui/react";
import { container, header } from "./headerFormStyles";
import { capitalize } from "../../../../../../utils/CapitalizeText";
// import useFetchTitleOfStudie from "../../../../../../hooks/fetch/useFetchTitleOfStudie";

interface HeaderFormProps {
  text: string;
}

export default function HeaderForm({ text }: HeaderFormProps) {
  const handleDesactiveTooltip = (text: string) => {
    const MAX_VALUE: number = 30;
    return text.length <= MAX_VALUE;
  };

  // const {title} = useFetchTitleOfStudie();
 
  return (
    <Box sx={container}>
      <Tooltip label={text} isDisabled={handleDesactiveTooltip(text)} p="1rem">
        <Heading sx={header}>{capitalize(text)}</Heading>
      </Tooltip>
    </Box>
  );
}
