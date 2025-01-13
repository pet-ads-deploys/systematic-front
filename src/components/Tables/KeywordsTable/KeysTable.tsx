import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Box,
  } from "@chakra-ui/react";
  import { FaChevronDown, FaChevronUp } from "react-icons/fa";
  
  interface keywordsInterface {
    keyword: string;
    frequency: number;
  }
  
  interface Props {
    keywords: keywordsInterface[];
    handleHeaderClick: (key: keyof keywordsInterface) => void;
    sortConfig: { key: keyof keywordsInterface; direction: "asc" | "desc" } | null;
  }
  
  export default function KeysTable({
    keywords,
    handleHeaderClick,
    sortConfig,
  }: Props) {
    return (
      <TableContainer width="97%"
      mt={5}
      borderRadius="1rem"
      boxShadow="lg"
      bg="#EBF0F3"
      overflowY="auto"
      maxH="63.5vh">
        <Table variant="unstyled" colorScheme="#263C56" size="md">
          <Thead bg="#EBF0F3" borderRadius="1rem">
            <Tr>
              {[
              { label: "Keyword", key: "keyword", width: "40%"},
              { label: "Frequency", key: "frequency", width: "40%"},
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
                onClick={() => handleHeaderClick(col.key as keyof keywordsInterface)}
                cursor="pointer"
                >
                  <Box display="flex" gap=".75rem" justifyContent="center" alignItems="center">
                    {col.label}
                    {sortConfig?.key === col.key ? (
                      sortConfig.direction === "asc" ? (
                        <FaChevronUp fontSize="xs" color="#263C56" />
                      ) : (
                        <FaChevronDown fontSize="xs" color="#263C56" />
                      )
                    ) : (
                      <FaChevronDown fontSize="xs" color="#263C56" />
                    )}
                  </Box>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {keywords.length ? (
              keywords.map((keyword, index) => (
                <Tr key={index}>
                  <Td aria-label="Keyword" textAlign="center">{keyword.keyword}</Td>
                  <Td aria-label="frequency of word" textAlign="center">{keyword.frequency}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={2} textAlign="center">
                  No keywords found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
  