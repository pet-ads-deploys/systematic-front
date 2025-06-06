// import EditionIcon from "./EditionIcon";
import { Box, Text } from "@chakra-ui/react";
import { conteiner, infosconteiner, text } from "../styles/EditionINfosStyles";

interface IEditionInfosProps {
  status?: string;
  lastModification: string;
  creation: string;
  isEdited: boolean;
}

export default function EditionInfos({ lastModification, status, /* isEdited */ }: IEditionInfosProps) {
  return (
    <Box sx={conteiner}>
      {/* <EditionIcon/> */}
      <Box sx={infosconteiner}>
        <Text sx={text}>Status: {status}</Text>
        <Text sx={text}>Last Modification: {lastModification}</Text>
      </Box>
    </Box>
  );
}
