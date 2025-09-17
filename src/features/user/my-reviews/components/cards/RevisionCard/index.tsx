// External library
import { Card, Flex } from "@chakra-ui/react";

// Components
import CardIcon from "../CardIcon";
import CardInfos from "../CardInfo";
import EditionInfos from "../../containers/EditionInfo";

// Services
import useNavigateToPendingStage from "@features/user/my-reviews/services/useNavigateToPendingStage";

// Styles
import { Cardstyles } from "./styles";

// Types
interface RevisionCardProps {
  revisionId: string;
  id: string;
  title: string;
}

export default function RevisionCard({
  revisionId,
  id,
  title,
}: RevisionCardProps) {
  const { redirectToPendingStage, stage } = useNavigateToPendingStage({
    reviewId: revisionId,
  });

  async function redirectToReview() {
    localStorage.setItem("systematicReviewId", revisionId);
    redirectToPendingStage();
  }

  return (
    <Card sx={Cardstyles} onClick={redirectToReview} cursor="pointer">
      <Flex>
        <CardIcon />
        <CardInfos title={title} id={id} />
      </Flex>
      <EditionInfos status={stage} />
    </Card>
  );
}
