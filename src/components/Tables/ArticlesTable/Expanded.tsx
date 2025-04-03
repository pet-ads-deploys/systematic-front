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
import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import {
  chevronIcon,
  collapsedSpanText,
  tdSX,
  tooltip,
} from "../../../pages/Execution/styles/CardsStyle";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { capitalize } from "../../../utils/CapitalizeText";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import StudySelectionContext from "../../Context/StudiesSelectionContext";
import usePagination from "../../../hooks/tables/usePagination";
import PaginationControl from "./PaginationControl";
import { IconType } from "react-icons";

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

  const statusIconMap: Record<string, React.ReactElement> = {
      "INCLUDED": <CheckCircleIcon color="green.500" />,
      "DUPLICATED": <InfoIcon color="blue.500" />,
      "EXCLUDED": <IoIosCloseCircle color="red" size="1.4rem" />,
      "UNCLASSIFIED": <WarningIcon color="yellow.500" />,
  };

  const priorityIconMap: Record<string, React.ReactElement> = {
    "VERY HIGH": <MdKeyboardDoubleArrowUp color="#388E3C" size="1.5rem" />,
    "HIGH": <MdKeyboardArrowUp color="#F57C00" size="1.5rem" />,
    "LOW": <MdKeyboardArrowDown color="#FBC02D" size="1.5rem" />,
    "VERY LOW": <MdKeyboardDoubleArrowDown color="#D32F2F" size="1.5rem" />,
  };

  const renderStatusIcon = (status: string) => statusIconMap[status] || null;
  const renderPriorityIcon = (priority: string) =>
    priorityIconMap[priority] || null;

  const columns = [
    { label: "ID", key: "studyReviewId", width: "2%" },
    { label: "Title", key: "title", width: "20%" },
    { label: "Author", key: "authors", width: "15%" },
    { label: "Journal", key: "venue", width: "10%" },
    { label: "Year", key: "year", width: "2%" },
    { label: "Selection", key: "selectionStatus", width: "15%" },
    { label: "Extraction", key: "extraction", width: "15%" },
    { label: "Reading Priority", key: "readingPriority", width: "15%" },
  ];

  const {
    currentPage,
    setCurrentPage,
    quantityOfPages,
    paginatedArticles,
    handleNextPage,
    handlePrevPage,
  } = usePagination(articles);

  if (setShowSelectionModal && setSelectionStudyIndex)
    return (
      <Box w="100%" maxH="82.5vh">
        <TableContainer
          w="100%"
          borderRadius="1rem 1rem 0 0"
          boxShadow="lg"
          bg="white"
          overflowY={"auto"}
        >
          <Table
            variant="unstyled"
            colorScheme="#263C56"
            size="md"
            boxShadow="md"
          >
            <Thead bg="white" borderRadius="1rem" justifyContent="space-around">
              <Tr alignItems="center" justifyContent="space-around">
                <Th
                  textAlign="center"
                  color="#263C56"
                  fontSize="larger"
                  w="5%"
                ></Th>
                {columns.map((col) => (
                  <Th
                    key={col.key}
                    textAlign="center"
                    color="#263C56"
                    fontSize="larger"
                    p="2rem 0 1rem 0"
                    textTransform="capitalize"
                    borderBottom="3px solid #C9D9E5"
                    onClick={() =>
                      handleHeaderClick(col.key as keyof ArticleInterface)
                    }
                    cursor="pointer"
                    w={col.width}
                  >
                    <Box
                      display="flex"
                      gap=".5rem"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {col.label}
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
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((e, index) => (
                  <Tr
                    key={index}
                    bg={
                      studyContext?.firstSelected == e.studyReviewId
                        ? "#A8E6A2"
                        : studyContext?.deletedArticles.find(
                            (id) => id === e.studyReviewId
                          )
                        ? "#F5B7B1"
                        : "transparent"
                    }
                    onClick={() => {
                      setSelectionStudyIndex?.(index);
                      setShowSelectionModal?.(true);
                    }}
                    transition="background-color 0.3s, box-shadow 0.3s"
                    p="0"
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
                    <Td sx={tdSX} w="5%">
                      {String(e.studyReviewId).padStart(5, "0")}
                    </Td>
                    <Td sx={tdSX} w="25%">
                      <Tooltip
                        sx={tooltip}
                        label={e.title}
                        aria-label="Full Title"
                        hasArrow
                      >
                        <Text sx={collapsedSpanText}>{e.title}</Text>
                      </Tooltip>
                    </Td>
                    <Td sx={tdSX} w="15%">
                      <Tooltip
                        sx={tooltip}
                        label={e.authors}
                        aria-label="Full Author List"
                        hasArrow
                      >
                        <Text sx={collapsedSpanText}>{e.authors}</Text>
                      </Tooltip>
                    </Td>
                    <Td sx={tdSX} w="10">
                      <Tooltip
                        sx={tooltip}
                        label={e.venue}
                        aria-label="Journal Name"
                        hasArrow
                      >
                        <Text sx={collapsedSpanText}>{e.venue}</Text>
                      </Tooltip>
                    </Td>
                    <Td sx={tdSX} w="5%">
                      <Tooltip
                        sx={tooltip}
                        label={e.year}
                        aria-label="Year of published"
                        hasArrow
                      >
                        <Text sx={collapsedSpanText}>{e.year}</Text>
                      </Tooltip>
                    </Td>

                    <Td sx={tdSX} w="8%">
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

                    <Td sx={tdSX} w="8%">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap="0.5rem"
                      >
                        {renderStatusIcon(e.extractionStatus)}
                        <Text sx={collapsedSpanText}>
                          {capitalize(
                            e.extractionStatus?.toString().toLowerCase() || ""
                          )}
                        </Text>
                      </Box>
                    </Td>

                    <Td sx={tdSX} w="8%">
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
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    No articles found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        <PaginationControl
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          quantityOfPages={quantityOfPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </Box>
    );
}
