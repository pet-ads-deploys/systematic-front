// Components
import RevisionCard from "../../../subcomponents/cards/RevisionCard";

// Type
import { cardDataProps } from "../../../../../services/useFetchRevisionCard";

interface RenderCardsProps {
  data: cardDataProps[];
}

const RenderCards = ({ data }: RenderCardsProps) => {
  return (
    <>
      {data.map((item) => (
        <RevisionCard
          key={item.id}
          revisionId={item.id}
          id={item.key}
          title={item.title}
          RevisorNames={item.collaborators}
          creation={item.creation}
          isEdited={item.isEdited}
        />
      ))}
    </>
  );
};

export default RenderCards;
