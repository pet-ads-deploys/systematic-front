// External library
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Tbody,
  Th,
} from "@chakra-ui/react";
import { ReportTd } from "../Subcomponents/ReportTd";


type DataTextQuestions = Record<string, number[]>;

type QuestionsTableProps = {
  data: DataTextQuestions;
};

export const QuestionsTable = ({data}: QuestionsTableProps) => {
  const columns = [
    { label: "Answer" },
    { label: "Studies" },
    { label: "Total" },
  ];

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
          {Object.entries(data).map(([answerText, ids]) => (
            <Tr key={answerText} _hover={{ bg: "gray.300" }}>
              <ReportTd text={answerText} />
              <ReportTd text={ids.join(", ")} />
              <ReportTd text={ids.length.toString()} />

            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};