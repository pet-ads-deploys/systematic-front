import { Container, Heading } from "@chakra-ui/react";

import ReferenceCard from "./References Cards/ReferenceCard";
import useFetchReferenceData from "../../../hooks/fetch/useFetchReferenceData";

export default function References() {
  const referenceData = useFetchReferenceData(
    "../../../mocks/referenceData.json"
  );

  return (
    <Container p="2px" style={{ maxHeight: "350px", overflowY: "auto" }}>
      <Heading textAlign="center" mb=".5em">
        References
      </Heading>
      <Container pl="1px">
        {referenceData.map((card) => (
          <ReferenceCard
            authors={card.authors}
            year={card.year}
            fullReference={card.fullReference}
          />
        ))}
      </Container>
    </Container>
  );
}
