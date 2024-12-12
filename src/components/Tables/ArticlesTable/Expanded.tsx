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
import {
  collapsedSpanText,
  tdSX,
  tooltip,
} from "../../../pages/Execution/styles/CardsStyle";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { capitalize } from "../../../utils/CapitalizeText";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";

interface Props {
  articles: ArticleInterface[];
  handleHeaderClick: (key: keyof ArticleInterface) => void;
}

export default function Collapsed({ articles, handleHeaderClick }: Props) {
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

  const renderPriorityIcon = (priority: string) => {
    switch (priority) {
      case "VERY_HIGH":
        return <MdKeyboardDoubleArrowUp color="#388E3C" size="1.5rem" />;
      case "HIGH":
        return <MdKeyboardArrowUp color="#F57C00" size="1.5rem" />;
      case "LOW":
        return <MdKeyboardArrowDown color="#FBC02D" size="1.5rem" />;
      case "VERY_LOW":
        return <MdKeyboardDoubleArrowDown color="#D32F2F" size="1.5rem" />;
      default:
        return null;
    }
  };

  if (setShowSelectionModal && setSelectionStudyIndex)
    return (
      <TableContainer
        width={"97%"}
        mt={5}
        borderRadius="1rem"
        boxShadow="lg"
        bg="#EBF0F3"
        overflowY={"auto"}
        maxH="80vh"
      >
        <Table
          variant="unstyled"
          colorScheme="#263C56"
          size="md"
          boxShadow="md"
        >
          <Thead bg="#EBF0F3" borderRadius="1rem" justifyContent="space-around">
            <Tr alignItems="center" justifyContent="space-around">
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                w={3}
              ></Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 0 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                w="5%"
                onClick={() => handleHeaderClick("studyReviewId")}
              >
                ID
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 0 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                onClick={() => handleHeaderClick("title")}
              >
                Title
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 0 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                onClick={() => handleHeaderClick("author")}
              >
                Author
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 0 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                onClick={() => handleHeaderClick("venue")}
              >

                Journal
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 1rem 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                w="8%"
                onClick={() => handleHeaderClick("selectionStatus")}
              >
                Selection
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 1rem 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                w="8%"
                onClick={() => handleHeaderClick("extraction")}
              >
                Extraction
              </Th>
              <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 1rem 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                w="8%"
                onClick={() => handleHeaderClick("readingPriority")}
              >
                Reading Priority
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
                  <Td textAlign="center" w="5%">
                    <Checkbox
                      defaultChecked={index === 0 || index === 3}
                      sx={{
                        borderColor: "#263C56",
                        _checked: {
                          bg: "#263C56",
                          borderColor: "#263C56",
                        },
                      }}
                    />
                  </Td>
                  <Td sx={tdSX}>{String(e.studyReviewId).padStart(5, "0")}</Td>
                  <Td sx={tdSX}>
                    <Tooltip sx={tooltip}
                      label={e.title}
                      aria-label="Full Title"
                      hasArrow
                    >
                      <Text sx={collapsedSpanText}>{e.title}</Text>
                    </Tooltip>
                  </Td>
                  <Td sx={tdSX}>
                    <Tooltip sx={tooltip}
                      label={e.authors}
                      aria-label="Full Author List"
                      hasArrow
                    >
                      <Text sx={collapsedSpanText}>{e.authors}</Text>
                    </Tooltip>
                  </Td>
                  <Td sx={tdSX}>
                    <Tooltip sx={tooltip}
                      label={e.venue}
                      aria-label="Journal Name"
                      hasArrow
                    >
                      <Text sx={collapsedSpanText}>{e.venue}</Text>
                    </Tooltip>
                  </Td>

                  <Td p=".5rem 0" w="5rem">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.5rem"
                    >
                      {renderStatusIcon(e.selectionStatus)}
                      <Text sx={collapsedSpanText}>
                        {capitalize(
                          e.selectionStatus?.toString().toLowerCase() || ""
                        )}
                      </Text>
                    </Box>
                  </Td>

                  <Td p=".5rem 0" w="5rem">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.5rem"
                    >
                      {renderStatusIcon("UNCLASSIFIED")}
                      <Text sx={collapsedSpanText}>
                        {/* {capitalize(
                          e.extraction?.toString().toLowerCase() || ""
                        )} */}
                        Unclassified
                      </Text>
                    </Box>
                  </Td>

                  <Td p=".5rem 0" w="5rem">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.5rem"
                    >
                      {renderPriorityIcon(e.readingPriority)}
                      <Text sx={collapsedSpanText}>
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
