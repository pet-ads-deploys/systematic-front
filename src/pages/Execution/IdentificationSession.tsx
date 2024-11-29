import { useParams } from "react-router-dom";
import FlexLayout from "../../components/ui/Flex/Flex";
import Header from "../../components/ui/Header/Header";
import {Flex} from "@chakra-ui/react";
import useGetSessionStudies from "../../hooks/useGetSessionStudies";
import ArticlesTable from "../../components/Tables/ArticlesTable/ArticlesTable";
import ArticleInterface from "../../../public/interfaces/ArticleInterface";

export default function IdentificationSession() {
    let articles: ArticleInterface[] = [];
    try{
        const { session = "" } = useParams();
        articles = useGetSessionStudies(session);
    } catch(e) { console.error(e + " failed to get the studies of the session on identificationSession.tsx"); }

    return (
        // <ArticlesTable articles={articles}/>
        <FlexLayout defaultOpen={1} navigationType="Accordion">
            <Header text="Search Sessions" />

            <Flex justifyContent={"center"}>
                <ArticlesTable articles={articles}/>
            </Flex>
        </FlexLayout>
    );
}
