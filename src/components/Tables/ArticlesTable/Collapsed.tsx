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
import {
  collapsedSpanText,
  collapsedTdSX,
  tooltip,
} from "../../../pages/Execution/styles/CardsStyle";
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

interface Props {
  articles: ArticleInterface[];
  handleHeaderClick: (key: keyof ArticleInterface) => void;
}

export default function Collapsed({ articles, handleHeaderClick }: Props) {
  const context = useContext(AppContext);
  const setShowSelectionModal = context?.setShowSelectionModal;
  const setSelectionStudyIndex = context?.setSelectionStudyIndex;

  return (
    <TableContainer
      width="97%"
      mt={5}
      borderRadius="1rem"
      boxShadow="lg"
      bg="#EBF0F3"
      overflowY="auto"
      maxH="63.5vh"
    >
      <Table variant="unstyled" colorScheme="#263C56" size="md">
        <Thead
          bg="#EBF0F3"
          borderRadius="1rem"
        >
          <Tr>
            <Th
              textAlign="center"
              color="#263C56"
              fontSize="larger"
              p="2rem 1rem 1rem 1rem"
              w="5%"
            ></Th>
            <Th
                textAlign="center"
                color="#263C56"
                fontSize="larger"
                p="2rem 1rem 1rem 1rem"
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
              p="2rem 1rem 1rem 1rem"
              textTransform="capitalize"
              borderBottom="3px solid #C9D9E5"
              w="30%"
              onClick={() => handleHeaderClick("title")}
            >
              Title
            </Th>
            <Th
              textAlign="center"
              color="#263C56"
              fontSize="larger"
              p="2rem 1rem 1rem 1rem"
              textTransform="capitalize"
              borderBottom="3px solid #C9D9E5"
              w="25%"
              onClick={() => handleHeaderClick("authors")}
            >
              Author
            </Th>
            <Th
              textAlign="center"
              color="#263C56"
              fontSize="larger"
              p="2rem 1rem 1rem 1rem"
              textTransform="capitalize"
              borderBottom="3px solid #C9D9E5"
              w="20%"
              onClick={() => handleHeaderClick("venue")}
            >
              Journal
            </Th>
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
                <Td sx={collapsedTdSX}>
                  {String(e.studyReviewId).padStart(5, "0")}
                </Td>
                <Td sx={collapsedTdSX}>
                  <Tooltip sx={tooltip}
                    label={e.title}
                    aria-label="Full Title"
                    hasArrow
                  >
                    <Text sx={collapsedSpanText}>{e.title}</Text>
                  </Tooltip>
                </Td>
                <Td sx={collapsedTdSX}>
                  <Tooltip sx={tooltip}
                    label={e.authors}
                    aria-label="Full Author List"
                    hasArrow
                  >
                    <Text sx={collapsedSpanText}>{e.authors}</Text>
                  </Tooltip>
                </Td>
                <Td sx={collapsedTdSX}>
                  <Tooltip sx={tooltip}
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
