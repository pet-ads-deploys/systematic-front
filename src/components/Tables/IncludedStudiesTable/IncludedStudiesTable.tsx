// External library
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Tbody,
  Th,
} from "@chakra-ui/react";
import useGetAllReviewArticles from "../../../hooks/useGetAllReviewArticles";
import { StudyInterface } from "../../../../public/interfaces/IStudy";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import useFetchInclusionCriteria from "../../../hooks/fetch/useFetchInclusionCriteria";
import { ReportTd } from "../Subcomponents/ReportTd";



// Types
type Column = {
  label: string;
};

export const IncludedStudiesTable = () => {
  const columns: Column[] = [
    { label: "Id" },
    { label: "Title" },
    { label: "Author" },
    { label: "Year" },
    { label: "Venue" },
    { label: "Source" },
    { label: "IC" },
  ];

  const studies: (StudyInterface | ArticleInterface)[] =
    useGetAllReviewArticles().articles.filter(
      (study) => study.extractionStatus === "INCLUDED"
    );

  const inclusionCriterias = useFetchInclusionCriteria();


  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.label}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {studies.map((study, index) => {
            const id = "studyReviewId" in study ? study.studyReviewId : index.toString();
            const sourceText = "searchSources" in study ? study.searchSources.join(", ") : "";
           const criteriaText = "criteria" in study
              ? study.criteria
                  .map((cr) => {
                    const idx = inclusionCriterias.findIndex((item) => item === cr);
                    return `C${idx + 1} : ${cr}`;
                  })
                  .join(" , ")
              : "";

            return (
              <Tr key={id} _hover={{ bg: "gray.300" }}>
                <ReportTd text={id.toString()}/>
                <ReportTd text={study.title} />
                <ReportTd text={study.authors} />
                <ReportTd text={study.year.toString()} />
                <ReportTd text={study.venue} />
                <ReportTd text={sourceText} />
                <ReportTd text={criteriaText} />
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
