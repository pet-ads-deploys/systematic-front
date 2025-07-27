import { Icon } from "@chakra-ui/react";
import { FaFile } from "react-icons/fa";

export const uploadIcon = {
  w: "60px",
  h: "60px",
  justifySelf: "center",
  alignSelf: "center",
  ml: "0.5rem",
  mb: 5,
};

export default function UploadIcon() {
  return <Icon as={FaFile} sx={uploadIcon} />;
}
