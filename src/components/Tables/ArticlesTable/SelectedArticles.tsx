import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
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
  const [firstSelected, setFirstSelected] = useState<number | null>(null);
  const [deletedArticles, setDeletedArticles] = useState<number[]>([]);

  useEffect(() => {
    const mappedArticles = Object.values(articles).map(({ id, title }) => ({
      id,
      title,
    }));
    setListArticles(mappedArticles);
  }, [articles]);

  const handleCheckboxChange = (id: number) => {
    let newDeletedArticles = [...deletedArticles];

    if (deletedArticles.includes(id)) {
      newDeletedArticles = newDeletedArticles.filter(
        (articleId) => articleId !== id
      );

      if (firstSelected === id) {
        setFirstSelected(null);
      }
    } else {
      newDeletedArticles.push(id);

      if (firstSelected === null) {
        setFirstSelected(id);
      }
    }

    setDeletedArticles(newDeletedArticles);
  };

  return (
    <TableContainer
      w="90%"
      h="20%"
      borderRadius="1rem"
      boxShadow="lg"
      bg="#EBF0F3"
      overflowY="auto"
    >
      <Table variant="unstyled" colorScheme="#263C56" size="md" boxShadow="md">
        <Thead>
          <Tr>
            <Th
              textAlign="center"
              color="#263C56"
              fontSize="larger"
              w="5%"
            ></Th>
            <Th
              textAlign="center"
              color="#263C56"
              fontSize="larger"
              p="2rem 2rem 1rem 0"
              textTransform="capitalize"
              borderBottom="3px solid #C9D9E5"
              w="10%"
              cursor="pointer"
            >
              ID
            </Th>
            <Th
              textAlign="center"
              color="#263C56"
              fontSize="larger"
              p="2rem 2rem 1rem 0"
              textTransform="capitalize"
              borderBottom="3px solid #C9D9E5"
              w="70%"
              cursor="pointer"
            >
              Título
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {listArticles.map((art) => {
            const isFirst = firstSelected === art.id;
            const isDeleted = deletedArticles.includes(art.id);

            return (
              <Tr
                key={art.id}
                bg={isFirst ? "#A8E6A2" : isDeleted ? "#F5B7B1" : "transparent"} 
              >
                <Td>
                  <Checkbox
                    isChecked={isDeleted}
                    onChange={() => handleCheckboxChange(art.id)}
                    sx={{
                      borderColor: "#263C56",
                      _checked: {
                        bg: "#263C56",
                        borderColor: "#263C56",
                      },
                    }}
                  />
                </Td>
                <Td>{art.id}</Td>
                <Td>{art.title}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
