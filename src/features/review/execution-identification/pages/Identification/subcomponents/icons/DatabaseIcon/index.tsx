import { Icon } from "@chakra-ui/react";
import { FaBoxArchive } from "react-icons/fa6";

export const dbicon = {
  w: "3rem",
  h: "auto",
  mt: "2%",
  ml: "2%",
};

export default function DataBaseIcon() {
  return <Icon as={FaBoxArchive} sx={dbicon} color={"#263C56"} />;
}
