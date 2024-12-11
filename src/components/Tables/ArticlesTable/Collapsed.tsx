import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Tooltip,
  Checkbox,
} from "@chakra-ui/react";
import { tdSX } from "../../../pages/Execution/styles/CardsStyle";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

interface Props {
  articles: ArticleInterface[];
}

export default function Collapsed({ articles }: Props) {
  const context = useContext(AppContext);
  const setShowSelectionModal = context?.setShowSelectionModal;
  const setSelectionStudyIndex = context?.setSelectionStudyIndex;

  if (setShowSelectionModal && setSelectionStudyIndex)
    return (
      <TableContainer
        width={"95%"}
        mt={5}
        borderRadius="1rem"
        boxShadow="lg"
        bg="#EBF0F3"
        overflowY={"auto"}
        maxH="75vh"
      >
        <Table
          variant="unstyled"
          colorScheme="#263C56"
          size="md"
          boxShadow="md"
        >
          <Thead
            bg="#EBF0F3"
            borderRadius="1rem"
            borderBottom="2px solid #C9D9E5"
            justifyContent="space-around"
          >
            <Tr>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="medium"
                mt="2rem"
                p="0 1rem"
                w={3}
              ></Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="medium"
                mt="2rem"
                p="2rem 0 1rem 0"
              >
                ID Paper
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="medium"
                mt="2rem"
                p="2rem 0 1rem 0"
              >
                Title
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="medium"
                mt="2rem"
                p="2rem 0 1rem 0"
              >
                Author
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="medium"
                mt="2rem"
                p="2rem 0 1rem 0"
              >
                Journal
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {articles ? (
              articles.map((e, index) => (
                <Tr
                  onClick={() => {
                    setSelectionStudyIndex(index);
                    setShowSelectionModal(true);
                  }}
                  key={index}
                  _hover={{ bg: "#F5F8F9" }}
                  transition="background-color 0.3s, box-shadow 0.3s"
                  borderBottom="none"
                >
                  <Td textAlign="center" p="0 1rem" w={3}>
                    <Checkbox
                      defaultChecked={index === 0 || index === 3}
                      sx={{
                        borderColor: "#263C56",
                        _checked: {
                          bg: "#263C56",
                          borderColor: "#263C56",
                        },
                      }}
                    ></Checkbox>
                  </Td>
                  <Td sx={tdSX} p="1rem 0">
                    <Tooltip
                      label={e.title}
                      aria-label="Título completo"
                      hasArrow
                      placement="right"
                      fontSize="xs"
                      p="1rem 0"
                    >
                      <Text sx={tdSX} p={0}>
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                    </Tooltip>
                  </Td>
                  <Td sx={tdSX} p="1rem 0">
                    <Tooltip
                      label={e.title}
                      aria-label="Título completo"
                      hasArrow
                      placement="right"
                      fontSize="xs"
                      p="1rem 0"
                    >
                      <Text sx={tdSX} p={0}>
                        {e.title}
                      </Text>
                    </Tooltip>
                  </Td>

                  <Td sx={tdSX} p="1rem 0">
                    <Tooltip
                      label={e.authors}
                      aria-label="Título completo"
                      hasArrow
                      placement="right"
                      fontSize="xs"
                      p="1rem 0"
                    >
                      <Text sx={tdSX} p={0}>
                        {e.authors}
                      </Text>
                    </Tooltip>
                  </Td>

                  <Td sx={tdSX} p="1rem 0">
                    <Tooltip
                      label={e.venue}
                      aria-label="Título completo"
                      hasArrow
                      placement="right"
                      fontSize="xs"
                      p="1rem 0"
                    >
                      <Text sx={tdSX} p={0}>
                        {e.venue}
                      </Text>
                    </Tooltip>
                  </Td>
                </Tr>
              ))
            ) : (
              <p>No articles found</p>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    );
}
