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
  Box,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  InfoIcon,
  CloseIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { tdSX } from "../../../pages/Execution/styles/CardsStyle";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { capitalize } from "../../../utils/CapitalizeText";

interface Props {
  articles: ArticleInterface[];
}

export default function Collapsed({ articles }: Props) {
  const context = useContext(AppContext);
  const setShowSelectionModal = context?.setShowSelectionModal;
  const setSelectionStudyIndex = context?.setSelectionStudyIndex;

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "INCLUDED":
        return <CheckCircleIcon color="green.500" />;
      case "DUPLICATED":
        return <InfoIcon color="blue.500" />;
      case "REJECTED":
        return <CloseIcon color="red.500" />;
      case "UNCLASSIFIED":
        return <WarningIcon color="yellow.500" />;
      default:
        return null;
    }
  };

  const renderPriorityIcon = (status: string) => {
    switch (status) {
      case "LOW":
        return <CheckCircleIcon color="green.500" />;
      case "VERY_LOW":
        return <InfoIcon color="blue.500" />;
      case "HIGH":
        return <CloseIcon color="red.500" />;
      case "VERY_HIGH":
        return <WarningIcon color="yellow.500" />;
      default:
        return null;
    }
  };

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
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="medium"
                mt="2rem"
                p="2rem 0 1rem 0"
              >
                Selection
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="medium"
                mt="2rem"
                p="2rem 0 1rem 0"
              >
                Extraction
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="medium"
                mt="2rem"
                p="2rem 0 1rem 0"
              >
                Priority
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

                  <Td textAlign="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.5rem"
                    >
                      {renderStatusIcon(e.selectionStatus)}
                      <Text>
                        {capitalize(
                          e.selectionStatus?.toString().toLowerCase() || ""
                        )}
                      </Text>
                    </Box>
                  </Td>

                  <Td textAlign="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.5rem"
                    >
                      {renderStatusIcon(e.extraction)}
                      <Text>
                        {capitalize(
                          e.extraction?.toString().toLowerCase() || ""
                        )}
                      </Text>
                    </Box>
                  </Td>

                  <Td textAlign="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.5rem"
                    >
                      {renderPriorityIcon(e.readingPriority)}
                      <Text>
                        {capitalize(
                          e.readingPriority?.toString().toLowerCase() || ""
                        )}
                      </Text>
                    </Box>
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
