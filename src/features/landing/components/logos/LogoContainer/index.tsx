import { Card } from "@chakra-ui/react";
import { cardConteiner } from "./styles";
import Logo from "../../../../public/assets/StartLogos/startwhite.png";
import { Image } from "@chakra-ui/react";

export default function LogoConteiner() {
  return (
    <Card sx={cardConteiner}>
      {" "}
      <Image src={Logo} w="18em" objectFit={"contain"} />
    </Card>
  );
}
