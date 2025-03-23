import {
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface ControlsProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  quantityOfPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export default function PaginationControl({
  currentPage,
  setCurrentPage,
  quantityOfPages,
  handleNextPage,
  handlePrevPage,
}: ControlsProps) {
  const numberOfCases = String(quantityOfPages).length;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      mt=".5rem"
      gap="1rem"
      w="100%"
    >
      <Button onClick={handlePrevPage}>Anterior</Button>
      <Text>
        Página {String(currentPage).padStart(numberOfCases, "0")} de
        {" " + quantityOfPages}
      </Text>
      <NumberInput
        width="5rem"
        min={1}
        max={quantityOfPages}
        value={currentPage}
        onChange={(valueString) => {
          const pageNumber = Number(valueString);
          if (pageNumber >= 1 && pageNumber <= quantityOfPages) {
            setCurrentPage(pageNumber);
          }
        }}
      >
        <NumberInputField border="2px solid black" />
        <NumberInputStepper>
          <NumberIncrementStepper color="black" />
          <NumberDecrementStepper color="black" />
        </NumberInputStepper>
      </NumberInput>
      <Button onClick={handleNextPage}>Próxima</Button>
    </Flex>
  );
}
