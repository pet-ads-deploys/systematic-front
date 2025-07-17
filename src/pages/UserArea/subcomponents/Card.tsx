import CardIcon from "./CardIcon";
import CardInfos from "./CardInfos";
import EditionInfos from "./EditionInfos";
import { Box, Card } from "@chakra-ui/react";
import EnterRevisionButton from "./EnterRevisionButton";
import { conteiner, infoconteiner } from "../styles/CardStyles";

interface iRevisionCardProps {
  title: string;
  RevisorNames: string[];
  lastModification: string;
  creation: string;
  isEdited: boolean;
}

export default function RevisionCard({
  title,
  RevisorNames,
  lastModification,
  creation,
  isEdited,
}: iRevisionCardProps) {
  return (
    <>
      <Card sx={conteiner}>
        <CardIcon />
        <CardInfos title={title} RevisorNames={RevisorNames} />
        <Box sx={infoconteiner}>
          <EnterRevisionButton />
          <EditionInfos
            lastModification={lastModification}
            creation={creation}
            isEdited={isEdited}
          />
        </Box>
      </Card>
    </>
  );
}
