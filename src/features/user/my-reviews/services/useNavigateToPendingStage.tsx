// Service
import useFetchRevisionStage from "./useFetchRevisionStage.tsx";

// Hook
import { useNavigation } from "@features/shared/hooks/useNavigation";

// Type
import type { Stage } from "./useFetchRevisionStage.tsx";

type NavigateToPendingStageProps = {
  reviewId: string;
};

export default function useNavigateToPendingStage({
  reviewId,
}: NavigateToPendingStageProps) {
  const { stage, formatedStage } = useFetchRevisionStage({ reviewId });

  const { toGo } = useNavigation();

  const getStageLink = (Stage: Stage) => {
    const StageMap: Record<Stage, string> = {
      PROTOCOL_PART_I: `/review/planning/protocol-part-I/${reviewId}`,
      PICOC: `/review/planning/protocol-part-I/${reviewId}`,
      PROTOCOL_PART_II: `/review/planning/protocol-part-II/${reviewId}`,
      PROTOCOL_PART_III: `/review/planning/protocol-part-III/${reviewId}`,
      IDENTIFICATION: `/review/execution/identification`,
      SELECTION: `/review/execution/selection`,
      EXTRACTION: `/review/execution/extraction`,
      GRAPHICS: `/review/summarization/graphics`,
      FINALIZATION: `/review/summarization/finalization`,
    };

    return StageMap[Stage];
  };

  const redirectToPendingStage = () => {
    toGo(getStageLink(stage as Stage));
  };

  return { redirectToPendingStage, stage: formatedStage };
}
