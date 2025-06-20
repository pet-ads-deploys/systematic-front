import CardIcon from "./CardIcon";
import CardInfos from "./CardInfos";
import EditionInfos from "./EditionInfos";
import { Box, Card } from "@chakra-ui/react";
import EnterRevisionButton from "./EnterRevisionButton";
import { CardInfosConteiner, Cardstyles } from "../styles/revisionCardstyles";
import goToUnfinishedSystematicReviewPart from "../../../hooks/goToUnfinishedSystematicReviewPart";

interface iRevisionCardProps {
  revisionId: string,
  id: string;
  title: string;
  RevisorNames: string[];
  status?: string;
  creation: string;
  lastModification?: string;
  isEdited: boolean;
}

export default function RevisionCard({ revisionId, id, title, RevisorNames, status, lastModification, isEdited, creation }: iRevisionCardProps) {
  async function redirectToReview(){
    localStorage.setItem("systematicReviewId", revisionId);
    goToUnfinishedSystematicReviewPart(revisionId);
  }
  
  return (
    <>
      <Card sx={Cardstyles} onClick={redirectToReview}>
        <CardIcon />
        <CardInfos title={title} RevisorNames={RevisorNames}/>
        <Box sx={CardInfosConteiner} id={id}>
          <EnterRevisionButton text="Review Info"/>
          <EditionInfos lastModification={(lastModification as string)} status={status} isEdited={isEdited} creation={creation} />
        </Box>
      </Card>
    </>
  );
}
