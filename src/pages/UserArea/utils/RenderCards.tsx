import RevisionCard from '../subcomponents/RevisionCard';
import { cardDataProps } from '../../../hooks/fetch/useFetchRevisionCard';

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
          status={item.status}
          creation={item.creation}
          isEdited={item.isEdited}
        />
      ))}
    </>
  );
};

export default RenderCards;
