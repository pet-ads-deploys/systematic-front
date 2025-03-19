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
  Tooltip,
} from "@chakra-ui/react";

import useSelectedArticles, {
  SelectedArticlesProps,
} from "../../../hooks/tables/useSelectedArticles";
import { tooltip } from "../../../pages/Execution/styles/CardsStyle";
import SelectedArticlesButton from "../../../pages/Execution/subcomponents/SelectedArticlesButton";
import useSendDuplicatedStudies from "../../../hooks/tables/useSendDuplicatedStudies";

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

  const { clearSelectedArticles } = useSelectedArticles();

  const { sendDuplicatedStudies } = useSendDuplicatedStudies({
    firstSelected: firstSelected,
    duplicatedStudies: deletedArticles.filter((art) => art != firstSelected),
  });

  const handleSendDuplicates = () => {
    sendDuplicatedStudies();
  };

  return (
    <>
      <SelectedArticlesButton
        handleSendDuplicates={handleSendDuplicates}
        handleClearSelectedArticles={clearSelectedArticles}
      />
      <TableContainer
        w="100%"
        h="100%"
        bg="white"
        overflowY="auto"
        overflowX="hidden"
      >
        <Table variant="unstyled" colorScheme="#263C56" size="md">
          <Thead>
            <Tr>
              <Th textAlign="center" color="#263C56" fontSize="larger"></Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 2rem 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                w="15%"
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
                w="80%"
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
                  bg={
                    isFirst ? "#A8E6A2" : isDeleted ? "#F5B7B1" : "transparent"
                  }
                >
                  <Td w="5%">
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
                  <Td>
                    <Tooltip
                      borderRadius=".5rem"
                      sx={tooltip}
                      label={art.id.toString()}
                      hasArrow
                    >
                      {String(art.id).padStart(5, "0")}
                    </Tooltip>
                  </Td>
                  <Td>
                    <Tooltip
                      borderRadius=".5rem"
                      sx={tooltip}
                      label={art.title.toString()}
                      hasArrow
                    >
                      {art.title}
                    </Tooltip>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
