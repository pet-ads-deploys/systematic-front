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
  chevronIcon,
  collapsedSpanText,
  collapsedTdSX,
  tooltip,
} from "../../../pages/Execution/styles/CardsStyle";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import StudySelectionContext from "../../Context/StudiesSelectionContext";

interface Props {
  articles: ArticleInterface[];
  handleHeaderClick: (key: keyof ArticleInterface) => void;
  sortConfig: { key: keyof ArticleInterface; direction: "asc" | "desc" } | null;
}

export default function Collapsed({
  articles,
  handleHeaderClick,
  sortConfig,
}: Props) {
  const context = useContext(AppContext);
  const setShowSelectionModal = context?.setShowSelectionModal;
  const setSelectionStudyIndex = context?.setSelectionStudyIndex;

  const studyContext = useContext(StudySelectionContext);

  return (
    <TableContainer
      width="100%"
      borderRadius="1rem"
      boxShadow="lg"
      bg="#EBF0F3"
      overflowY="auto"
      h="100%"
    >
      <Table variant="unstyled" colorScheme="#263C56" size="md">
        <Thead bg="#EBF0F3" borderRadius="1rem">
          <Tr>
            <Th
              textAlign="center"
              color="#263C56"
              fontSize="larger"
              p="2rem 1rem 1rem 1rem"
              w="5%"
            ></Th>
            {[
              { label: "ID", key: "studyReviewId", width: "5%" },
              { label: "Title", key: "title", width: "30%" },
              { label: "Author", key: "authors", width: "20%" },
              { label: "Journal", key: "venue", width: "35%" },
            ].map((col) => (
              <Th
                key={col.key}
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 1rem 1rem 1rem"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                w={col.width}
                onClick={() =>
                  handleHeaderClick(col.key as keyof ArticleInterface)
                }
              >
                <Box
                  display="flex"
                  gap=".75rem"
                  justifyContent="center"
                  alignItems="center"
                >
                  {col.label}{" "}
                  {sortConfig?.key === col.key ? (
                    sortConfig.direction === "asc" ? (
                      <FaChevronUp style={chevronIcon} />
                    ) : (
                      <FaChevronDown style={chevronIcon} />
                    )
                  ) : (
                    <FaChevronDown style={chevronIcon} />
                  )}
                </Box>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {articles && articles.length ? (
            articles.map((e, index) => (
              <Tr
                key={index}
                onClick={() => {
                  setSelectionStudyIndex?.(index);
                  setShowSelectionModal?.(true);
                }}
                _hover={{ bg: "#F5F8F9" }}
                transition="background-color 0.3s, box-shadow 0.3s"
              >
                <Td textAlign="center" w="5%">
                  <Checkbox
                    isChecked={
                      !!studyContext?.selectedArticles[e.studyReviewId]
                    }
                    onChange={() =>
                      studyContext?.toggleArticlesSelection(
                        e.studyReviewId,
                        e.title
                      )
                    }
                    sx={{
                      borderColor: "#263C56",
                      _checked: {
                        bg: "#263C56",
                        borderColor: "#263C56",
                      },
                    }}
                  />
                </Td>
                <Td sx={collapsedTdSX}>
                  {String(e.studyReviewId).padStart(5, "0")}
                </Td>
                <Td sx={collapsedTdSX}>
                  <Tooltip
                    sx={tooltip}
                    label={e.title}
                    aria-label="Full Title"
                    hasArrow
                  >
                    <Text sx={collapsedSpanText}>{e.title}</Text>
                  </Tooltip>
                </Td>
                <Td sx={collapsedTdSX}>
                  <Tooltip
                    sx={tooltip}
                    label={e.authors}
                    aria-label="Full Author List"
                    hasArrow
                  >
                    <Text sx={collapsedSpanText}>{e.authors}</Text>
                  </Tooltip>
                </Td>
                <Td sx={collapsedTdSX}>
                  <Tooltip
                    sx={tooltip}
                    label={e.venue}
                    aria-label="Journal Name"
                    hasArrow
                  >
                    <Text sx={collapsedSpanText}>{e.venue}</Text>
                  </Tooltip>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5} textAlign="center">
                No articles found.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
