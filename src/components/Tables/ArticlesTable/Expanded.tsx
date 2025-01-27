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
  WarningIcon,
} from "@chakra-ui/icons";
import {
  chevronIcon,
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
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

interface Props {
  articles: ArticleInterface[];
  handleHeaderClick: (key: keyof ArticleInterface) => void;
  sortConfig: { key: keyof ArticleInterface; direction: "asc" | "desc" } | null;
}

export default function Collapsed({ articles, handleHeaderClick, sortConfig }: Props) {
  const context = useContext(AppContext);
  const setShowSelectionModal = context?.setShowSelectionModal;
  const setSelectionStudyIndex = context?.setSelectionStudyIndex;

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "INCLUDED":
        return <CheckCircleIcon color="green.500" />;
      case "DUPLICATED":
        return <InfoIcon color="blue.500" />;
      case "EXCLUDED":
        return <IoIosCloseCircle color="red" size="1.4rem"/>;
      case "UNCLASSIFIED":
        return <WarningIcon color="yellow.500" />;
      default:
        return null;
    }
  };

  const renderPriorityIcon = (priority: string) => {
    switch (priority) {
      case "VERY HIGH":
        return <MdKeyboardDoubleArrowUp color="#388E3C" size="1.5rem" />;
      case "HIGH":
        return <MdKeyboardArrowUp color="#F57C00" size="1.5rem" />;
      case "LOW":
        return <MdKeyboardArrowDown color="#FBC02D" size="1.5rem" />;
      case "VERY LOW":
        return <MdKeyboardDoubleArrowDown color="#D32F2F" size="1.5rem" />;
      default:
        return null;
    }
  };

  const columns = [
    { label: "ID", key: "studyReviewId", width: "10%" },
    { label: "Title", key: "title", width: "30%" },
    { label: "Author", key: "authors", width: "20%" },
    { label: "Journal", key: "venue", width: "28%" },
    { label: "Selection", key: "selectionStatus", width: "10%" },
    { label: "Extraction", key: "extraction", width: "10%" },
    { label: "Reading Priority", key: "readingPriority", width: "11%" },
  ];


  if (setShowSelectionModal && setSelectionStudyIndex)
    return (
      <TableContainer
        width={"97%"}
        mt={5}
        borderRadius="1rem"
        boxShadow="lg"
        bg="#EBF0F3"
        overflowY={"auto"}
        maxH="63.5vh"
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
            {columns.map((col) => (
              <Th
                key={col.key}
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 2rem 1rem 0"
                textTransform="capitalize"
                borderBottom="3px solid #C9D9E5"
                w={col.width}
                onClick={() => handleHeaderClick(col.key as keyof ArticleInterface)}
                cursor="pointer"
              >
                <Box display="flex" gap=".5rem" justifyContent="space-evenly" alignItems="center">
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
          {articles && articles.length ? (
            articles.map((e, index) => (
              <Tr
                onClick={() => {
                  setSelectionStudyIndex?.(index);
                  setShowSelectionModal?.(true);
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

                <Td p=".5rem 0" w="8%">
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

                <Td p=".5rem 0" w="8%">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="0.5rem"
                  >
                    {/* {renderStatusIcon(e.extraction)} */}
                    {renderStatusIcon("UNCLASSIFIED")}
                    <Text sx={collapsedSpanText}>
                      {capitalize(
                        e.extraction?.toString().toLowerCase() || "Unclassified"
                      )}
                    </Text>
                  </Box>
                </Td>

                <Td p=".5rem 0" w="8%">
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
  );
}