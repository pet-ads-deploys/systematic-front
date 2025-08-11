import { Box, Button, Flex, Text, Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface ControlsProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  quantityOfPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  changeQuantityOfItens: (newQuantity: number) => void;
}

export default function PaginationControl({
  currentPage,
  setCurrentPage,
  quantityOfPages,
  handleNextPage,
  handlePrevPage,
  changeQuantityOfItens,
}: ControlsProps) {
  const numberOfCases = String(quantityOfPages).length;
  const isPaginationEnabled = quantityOfPages > 1;

  return (
    <Flex
      w="100%"
      bg="white"
      p="1.5rem"
      borderRadius="0 0 1rem 1rem"
      flexWrap="wrap"
      alignItems="center"
    >
      <Box flex="1" minW="100px" display={{ base: "none", md: "block" }} />
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        gap=".5rem"
        minW={{ base: "100%", md: "200px" }}
        w={{ base: "100%", md: "auto" }}
        order={{ base: 2, md: 1 }}
        mb={{ base: "0.5rem", md: 0 }}
      >
        <Text whiteSpace="nowrap">Rows per page</Text>
        <Select
          w="70px"
          h="32px"
          textAlign="center"
          onChange={(e) => changeQuantityOfItens(Number(e.target.value))}
          defaultValue={15}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
        </Select>
      </Flex>
      <Flex
        flex="1"
        justifyContent={{ base: "center", md: "flex-end" }}
        alignItems="center"
        gap="1rem"
        minW={{ base: "100%", md: "250px" }}
        w={{ base: "100%", md: "auto" }}
        order={{ base: 3, md: 2 }}
      >
        <Text>
          Page {String(currentPage).padStart(numberOfCases, "0")} of
          {" " + quantityOfPages}
        </Text>
        {isPaginationEnabled && (
          <Button variant="outline" fontSize="1.6rem" onClick={() => setCurrentPage(1)}>
            &laquo;
          </Button>
        )}
        {isPaginationEnabled && (
          <Button variant="outline" fontSize="2rem" onClick={handlePrevPage}>
            &lsaquo;
          </Button>
        )}
        {isPaginationEnabled && (
          <Button variant="outline" fontSize="2rem" onClick={handleNextPage}>
            &rsaquo;
          </Button>
        )}
        {isPaginationEnabled && (
          <Button variant="outline" fontSize="1.6rem" onClick={() => setCurrentPage(quantityOfPages)}>
            &raquo;
          </Button>
        )}
      </Flex>
    </Flex>
  );
}