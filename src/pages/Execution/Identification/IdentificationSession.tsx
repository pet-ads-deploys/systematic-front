// External libraries
import { useParams } from "react-router-dom";

// Components
import Header from "../../../components/ui/Header/Header";
import ArticlesTable from "../../../components/Tables/ArticlesTable/ArticlesTable";

// Hooks
import useGetSessionStudies from "../../../hooks/useGetSessionStudies";

// Styles
import FlexLayout from "../../../components/ui/Flex/Flex";
import { Flex } from "@chakra-ui/react";

export default function IdentificationSession() {
  const { session = "" } = useParams();
  const { articles } = useGetSessionStudies(session);

  return (
    <FlexLayout defaultOpen={1} navigationType="Accordion">
      <Header text="Search Sessions" />
      <Flex justifyContent={"center"} alignItems={"center"} w={"98%"} h={"90%"}>
        <ArticlesTable articles={articles} />
      </Flex>
    </FlexLayout>
  );
}
