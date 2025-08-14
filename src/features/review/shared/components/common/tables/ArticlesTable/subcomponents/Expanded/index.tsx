// External library
import React, { useContext, useState } from "react";
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
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";

import { RiCheckboxMultipleBlankFill } from "react-icons/ri";

// Context
import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";

// Hook
import usePagination from "@features/review/shared/hooks/usePagination";

// Components
import PaginationControl from "../controlls/PaginationControl";
import { Resizable } from "./subcomponents/Resizable";

// Style
import {
  chevronIcon,
  collapsedSpanText,
  tdSX,
  tooltip,
} from "@features/review/execution-identification/pages/Identification/subcomponents/accordions/styles";

// Utils
import { capitalize } from "@features/shared/utils/helpers/formatters/CapitalizeText";

// Type
import type ArticleInterface from "@features/review/shared/types/ArticleInterface";
import type { ViewModel } from "@features/review/shared/hooks/useLayoutPage";
import type { ColumnVisibility } from "@features/review/shared/hooks/useVisibilityColumns";

interface Props {
  articles: ArticleInterface[];
  handleHeaderClick: (key: keyof ArticleInterface) => void;
  sortConfig: { key: keyof ArticleInterface; direction: "asc" | "desc" } | null;
  layout?: ViewModel;
  columnsVisible: ColumnVisibility;
}

type HeaderKeys =
  | "studyReviewId"
  | "title"
  | "authors"
  | "venue"
  | "year"
  | "selectionStatus"
  | "extractionStatus"
  | "score"
  | "readingPriority";

type Column = {
  key: HeaderKeys;
  label: string;
  width: string | number;
};

export default function Expanded({
  articles,
  handleHeaderClick,
  sortConfig,
  layout,
  columnsVisible,
}: Props) {
  const [columnWidths, setColumnWidths] = useState({
    studyReviewId: "62px",
    title: "150px",
    authors: "150px",
    venue: "100px",
    year: "62px",
    selectionStatus: "100px",
    extractionStatus: "100px",
    score: "62px",
    readingPriority: "100px",
  });
  const studyContext = useContext(StudySelectionContext);

  const columns: Column[] = [
    { label: "ID", key: "studyReviewId", width: columnWidths.studyReviewId },
    { label: "Title", key: "title", width: columnWidths.title },
    { label: "Author", key: "authors", width: columnWidths.authors },
    { label: "Journal", key: "venue", width: columnWidths.venue },
    { label: "Year", key: "year", width: columnWidths.year },
    {
      label: "Selection",
      key: "selectionStatus",
      width: columnWidths.selectionStatus,
    },
    {
      label: "Extraction",
      key: "extractionStatus",
      width: columnWidths.extractionStatus,
    },
    { label: "Score", key: "score", width: columnWidths.score },
    {
      label: "Priority",
      key: "readingPriority",
      width: columnWidths.readingPriority,
    },
  ];

  const statusIconMap: Record<string, React.ReactElement> = {
    INCLUDED: <CheckCircleIcon color="green.500" />,
    DUPLICATED: <InfoIcon color="blue.500" />,
    EXCLUDED: <IoIosCloseCircle color="red" size="1.4rem" />,
    UNCLASSIFIED: <WarningIcon color="yellow.500" />,
  };

  const priorityIconMap: Record<string, React.ReactElement> = {
    VERY_LOW: <MdKeyboardDoubleArrowDown color="#D32F2F" size="1.5rem" />,
    LOW: <MdKeyboardArrowDown color="#FBC02D" size="1.5rem" />,
    HIGH: <MdKeyboardArrowUp color="#F57C00" size="1.5rem" />,
    VERY_HIGH: <MdKeyboardDoubleArrowUp color="#388E3C" size="1.5rem" />,
  };

  const renderStatusIcon = (status: string) => statusIconMap[status] || null;
  const renderPriorityIcon = (priority: string) =>
    priorityIconMap[priority] || null;

  const {
    currentPage,
    quantityOfPages,
    paginatedArticles,
    handleNextPage,
    handlePrevPage,
    handleBackToInitial,
    handleGoToFinal,
    changeQuantityOfItens,
  } = usePagination(articles);

  const handleColumnResize = (key: HeaderKeys, newWidth: number) => {
    setColumnWidths((prev) => {
      const newWidths = { ...prev };

      const visibleColumnsKeys = (Object.keys(prev) as HeaderKeys[]).filter(
        (colKey) => columnsVisible[`${colKey}`]
      );

      const columnIndex = visibleColumnsKeys.indexOf(key);

      const minWidth = 62;
      const maxWidth = 300;
      const currentWidth = parseFloat(prev[key]);
      newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      let difference = newWidth - currentWidth;

      if (difference === 0 || columnIndex === visibleColumnsKeys.length - 1) {
        newWidths[key] = `${newWidth}px`;
        return newWidths;
      }

      let totalResizableWidth = 0;
      for (let i = columnIndex + 1; i < visibleColumnsKeys.length; i++) {
        totalResizableWidth +=
          parseFloat(prev[visibleColumnsKeys[i]]) - minWidth;
      }

      if (difference > totalResizableWidth) {
        const adjustedNewWidth = currentWidth + totalResizableWidth;
        newWidths[key] = `${adjustedNewWidth}px`;
        difference = adjustedNewWidth - currentWidth;

        for (let i = columnIndex + 1; i < visibleColumnsKeys.length; i++) {
          newWidths[visibleColumnsKeys[i]] = `${minWidth}px`;
        }
        return newWidths;
      }

      let remainingDifference = difference;
      for (let i = columnIndex + 1; i < visibleColumnsKeys.length; i++) {
        const nextColumnKey = visibleColumnsKeys[i];
        const nextColumnWidth = parseFloat(prev[nextColumnKey]);
        const spaceToReduce = nextColumnWidth - minWidth;
        const reduction = Math.min(remainingDifference, spaceToReduce);

        newWidths[nextColumnKey] = `${nextColumnWidth - reduction}px`;
        remainingDifference -= reduction;

        if (remainingDifference <= 0) {
          break;
        }
      }

      newWidths[key] = `${newWidth}px`;
      return newWidths;
    });
  };

  if (!studyContext) return;

  const {
    firstSelected,
    deletedArticles,
    toggleArticlesSelection,
    setSelectedArticleReview,
  } = studyContext;

  const collapsedSpanTextChanged = {
    ...collapsedSpanText,
    w: "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  return (
    <Box w="100%" maxH="82.5vh">
      <TableContainer
        w="100%"
        minH={
          layout == "horizontal" || layout == "horizontal-invert"
            ? "15rem"
            : {
                base: "calc(100vh - 18rem)",
                md: "calc(100vh - 15rem)",
              }
        }
        maxH={
          layout == "horizontal" || layout == "horizontal-invert"
            ? "15rem"
            : "calc(100vh - 15rem)"
        }
        borderRadius="1rem 1rem 0 0"
        boxShadow="lg"
        bg="white"
        overflowY="auto"
      >
        <Table variant="unstyled" colorScheme="black" size="md" layout="fixed">
          <Thead
            bg="white"
            borderRadius="1rem"
            justifyContent="space-around"
            position="sticky"
            top="0"
            zIndex="1"
            borderBottom=".5rem solid #C9D9E5"
          >
            <Tr>
              <Th
                alignItems="center"
                justifyContent="center"
                color="#263C56"
                w="1rem"
                bg="white"
              >
                <RiCheckboxMultipleBlankFill size="1.25rem" />
              </Th>
              {columns.map(
                (col) =>
                  columnsVisible[`${col.key}`] && (
                    <Th
                      key={col.key}
                      textAlign="center"
                      color="#263C56"
                      fontSize="larger"
                      p="0"
                      textTransform="capitalize"
                      cursor="pointer"
                      w={columnWidths[col.key]}
                    >
                      <Resizable
                        direction="horizontal"
                        minWidth={62}
                        maxWidth={300}
                        onResize={(width) => handleColumnResize(col.key, width)}
                      >
                        {({ ref, isResizing }) => (
                          <Box
                            ref={ref}
                            position="relative"
                            h="100%"
                            w="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            onClick={() =>
                              !isResizing &&
                              handleHeaderClick(
                                col.key as keyof ArticleInterface
                              )
                            }
                          >
                            <Box
                              display="flex"
                              gap=".5rem"
                              justifyContent="center"
                              alignItems="center"
                              w="100%"
                              p="2rem 1rem 1rem 0"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                            >
                              <Text
                                flex="1"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                textAlign="center"
                                px="0.5rem"
                              >
                                {col.label}
                              </Text>
                              {sortConfig?.key === col.key ? (
                                sortConfig.direction === "asc" ? (
                                  <Box flexShrink={0}>
                                    <FaChevronUp style={chevronIcon} />
                                  </Box>
                                ) : (
                                  <Box flexShrink={0}>
                                    <FaChevronDown style={chevronIcon} />
                                  </Box>
                                )
                              ) : (
                                <Box flexShrink={0}>
                                  <FaChevronDown style={chevronIcon} />
                                </Box>
                              )}
                            </Box>
                            <Box
                              className="resize-handle"
                              position="absolute"
                              right="0"
                              top="0"
                              bottom="0"
                              width=".5rem"
                              cursor="col-resize"
                              zIndex={2}
                              _hover={{ bg: "#263C56" }}
                            />
                          </Box>
                        )}
                      </Resizable>
                    </Th>
                  )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((reference, index) => (
                <Tr
                  key={index}
                  bg={
                    firstSelected == reference.studyReviewId
                      ? "#A8E6A2"
                      : deletedArticles.find(
                          (id) => id === reference.studyReviewId
                        )
                      ? "#F5B7B1"
                      : "transparent"
                  }
                  onClick={() => {
                    setSelectedArticleReview(reference.studyReviewId);
                  }}
                  transition="background-color 0.3s, box-shadow 0.3s"
                  p="0"
                >
                  <Td textAlign="center" w="5%">
                    <Checkbox
                      isChecked={
                        !!studyContext?.selectedArticles[
                          reference.studyReviewId
                        ]
                      }
                      onChange={() =>
                        toggleArticlesSelection(
                          reference.studyReviewId,
                          reference.title
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
                  <Td sx={tdSX} w={columnWidths.studyReviewId}>
                    <Tooltip
                      sx={tooltip}
                      label={reference.title}
                      aria-label="Full ID"
                      hasArrow
                    >
                      <Text sx={collapsedSpanTextChanged}>
                        {String(reference.studyReviewId).padStart(5, "0")}
                      </Text>
                    </Tooltip>
                  </Td>
                  {columnsVisible["title"] && (
                    <Td sx={tdSX} w={columnWidths.title}>
                      <Tooltip
                        sx={tooltip}
                        label={reference.title}
                        aria-label="Full Title"
                        hasArrow
                      >
                        <Text sx={collapsedSpanTextChanged}>
                          {reference.title}
                        </Text>
                      </Tooltip>
                    </Td>
                  )}
                  {columnsVisible["authors"] && (
                    <Td sx={tdSX} w={columnWidths.authors}>
                      <Tooltip
                        sx={tooltip}
                        label={reference.authors}
                        aria-label="Full Author List"
                        hasArrow
                      >
                        <Text sx={collapsedSpanTextChanged}>
                          {reference.authors}
                        </Text>
                      </Tooltip>
                    </Td>
                  )}
                  {columnsVisible["venue"] && (
                    <Td sx={tdSX} w={columnWidths.venue}>
                      <Tooltip
                        sx={tooltip}
                        label={reference.venue}
                        aria-label="Journal Name"
                        hasArrow
                      >
                        <Text sx={collapsedSpanTextChanged}>
                          {reference.venue}
                        </Text>
                      </Tooltip>
                    </Td>
                  )}
                  {columnsVisible["year"] && (
                    <Td sx={tdSX} w={columnWidths.year}>
                      <Tooltip
                        sx={tooltip}
                        label={reference.year}
                        aria-label="Year of published"
                        hasArrow
                      >
                        <Text sx={collapsedSpanTextChanged}>
                          {reference.year}
                        </Text>
                      </Tooltip>
                    </Td>
                  )}
                  {columnsVisible["selectionStatus"] && (
                    <Td sx={tdSX} w={columnWidths.selectionStatus}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap="0.5rem"
                      >
                        {renderStatusIcon(reference.selectionStatus)}
                        <Text sx={collapsedSpanTextChanged}>
                          {capitalize(
                            reference.selectionStatus
                              ?.toString()
                              .toLowerCase() || ""
                          )}
                        </Text>
                      </Box>
                    </Td>
                  )}
                  {columnsVisible["extractionStatus"] && (
                    <Td sx={tdSX} w={columnWidths.extractionStatus}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap="0.5rem"
                      >
                        {renderStatusIcon(reference.extractionStatus)}
                        <Text sx={collapsedSpanTextChanged}>
                          {capitalize(
                            reference.extractionStatus
                              ?.toString()
                              .toLowerCase() || ""
                          )}
                        </Text>
                      </Box>
                    </Td>
                  )}
                  {columnsVisible["score"] && (
                    <Td sx={tdSX} w={columnWidths.score}>
                      <Tooltip
                        sx={tooltip}
                        label={reference.score}
                        aria-label="score of article"
                        hasArrow
                      >
                        <Text sx={collapsedSpanTextChanged}>
                          {reference.score}
                        </Text>
                      </Tooltip>
                    </Td>
                  )}
                  {columnsVisible["readingPriority"] && (
                    <Td
                      sx={tdSX}
                      w={columnWidths.readingPriority}
                      pl="0.5rem"
                      pr="0.5rem"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap="0.5rem"
                      >
                        {renderPriorityIcon(reference.readingPriority)}
                        <Text sx={collapsedSpanTextChanged}>
                          {capitalize(
                            reference.readingPriority
                              ?.toString()
                              .toLowerCase() || ""
                          ).replace("_", " ")}
                        </Text>
                      </Box>
                    </Td>
                  )}
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
        quantityOfPages={quantityOfPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handleBackToInitial={handleBackToInitial}
        handleGoToFinal={handleGoToFinal}
        changeQuantityOfItens={changeQuantityOfItens}
      />
    </Box>
  );
}
