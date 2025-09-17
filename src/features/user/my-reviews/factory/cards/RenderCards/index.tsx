// Components
import RevisionCard from "@features/user/my-reviews/components/cards/RevisionCard";

// Type
import type { CardReview } from "@features/user/my-reviews/types";

interface RenderCardsProps {
  data: CardReview[];
}

const RenderCards = ({ data }: RenderCardsProps) => {
  return (
    <>
      {data.map((item) => (
        <RevisionCard
          key={item.key}
          revisionId={item.id}
          id={item.id}
          title={item.title}
        />
      ))}
    </>
  );
};

export default RenderCards;
