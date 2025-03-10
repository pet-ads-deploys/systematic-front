import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { SelectedArticlesProps } from "../../../hooks/tables/useSelectedArticles";

interface SelectArticlesTableProps {
  articles: Record<number, SelectedArticlesProps>;
}

export default function SelectedArticles({
  articles,
}: SelectArticlesTableProps) {
  const [listArticles, setListArticles] = useState<
    { id: number; title: string }[]
  >([]);

  console.log(
    "artigos selecionados que setão vindo aqui na tabela: ",
    articles
  );

  useEffect(() => {
    const mappedArticles = Object.values(articles).map(({ id, title }) => ({
      id,
      title,
    }));
    setListArticles(mappedArticles);
  }, [articles]);

  return (
    <TableContainer w="90%" h="90%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Título</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listArticles.map((art) => (
            <Tr key={art.id}>
              <Td>{art.id}</Td>
              <Td>{art.title}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
