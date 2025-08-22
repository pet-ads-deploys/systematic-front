import { Icon } from "@chakra-ui/react";
import { cardIcon } from "../../icons/styles";

import { AiOutlineFileSearch } from "react-icons/ai";
//import { BiFileFind } from "react-icons/bi";
//import { HiDocumentSearch } from "react-icons/hi";
//import { IoDocumentText } from "react-icons/io5";

export default function CardIcon() {
  return (
    <Icon color="#263C56" as={AiOutlineFileSearch} sx={cardIcon} mr="10px" />
  );
}
