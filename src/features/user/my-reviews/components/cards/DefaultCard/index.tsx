import CardIcon from "../CardIcon";
import CardInfos from "../CardInfo";
import EditionInfos from "../../containers/EditionInfo";
import { Box, Card } from "@chakra-ui/react";
import EnterRevisionButton from "../../buttons/EnterRevisionButton";
import { conteiner, infoconteiner } from "./CardStyles";

interface iRevisionCardProps {
  title: string;
  RevisorNames: string[];
  lastModification: string;
  creation: string;
  isEdited: boolean;
}

export default function RevisionCard({ title }: iRevisionCardProps) {
  return (
    <>
      <Card sx={conteiner}>
        <CardIcon />
        <CardInfos title={title} id="" />
        <Box sx={infoconteiner}>
          <EnterRevisionButton />
          <EditionInfos status="" />
        </Box>
      </Card>
    </>
  );
}
