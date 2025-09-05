import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  NumberInput,
  NumberInputField,
  Box,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
  ModalCloseButton,
} from "@chakra-ui/react";
import useFetchDataBases from "@features/review/shared/services/useFetchDataBases";
import { FiChevronDown } from "react-icons/fi";
import useFetchInclusionCriteria from "@features/review/shared/services/useFetchInclusionCriteria";
import { FilterType } from "@features/review/summarization-graphics/hooks/useGraphicsState";



export default function FiltersModal({availableFilters,filters,setFilters,}: {
  availableFilters: FilterType[];
  filters: Record<string, any>;
  setFilters: (f: any) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure(); //modal
  const { databases } = useFetchDataBases();
  const inclusionCriterias = useFetchInclusionCriteria();

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);

      if (!filters.sources) {
        setLocalFilters((prev) => ({ ...prev, sources: [] }));
      }
    }
  }, [isOpen, filters]);

  const toggleSource = (source: string) => {
    setLocalFilters((prev) => {
      const current: string[] = prev.sources || [];
      if (current.includes(source)) {
        return { ...prev, sources: current.filter((s) => s !== source) };
      } else {
        return { ...prev, sources: [...current, source] };
      }
    });
  };

 const toggleCriterias = (criteria: string) => {
  setLocalFilters((prev) => {
    const current: string[] = prev.criteria || [];
    if (current.includes(criteria)) {
      return { ...prev, criteria: current.filter((c) => c !== criteria) };
    } else {
      return { ...prev, criteria: [...current, criteria] };
    }
  });
};


  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };
  const handleClear = () => {
  const newState: Record<string, any> = {};
  if (availableFilters.includes("Start Year")) newState.startYear = undefined;
  if (availableFilters.includes("End Year")) newState.endYear = undefined;
  if (availableFilters.includes("Source")) newState.sources = [];
  if (availableFilters.includes("Criteria")) newState.criterias= [];
  setLocalFilters(newState);
  setFilters(newState);
  onClose();
};


  return (
    <>
      <Button onClick={onOpen} bg="gray.200" color="gray.600">
        Filters
        <FiChevronDown />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton/> 
          <ModalHeader>Set Filters</ModalHeader>
          <ModalBody display="flex" flexDirection="column" gap={4}>
            {(availableFilters.includes("Start Year") ||
              availableFilters.includes("End Year")) && (
              <Text fontWeight="bold">Time Period:</Text>
            )}

            {availableFilters.map((filter) =>
              filter === "Source" ? (
                <Box key={filter}>
                  <Text fontWeight="bold" mb={2}>
                    Sources:
                  </Text>
                  <Wrap spacing={4}>
                    {databases.map((db) => (
                      <WrapItem key={db}>
                        <Checkbox
                          isChecked={(localFilters.sources || []).includes(db)}
                          onChange={() => toggleSource(db)}
                        >
                          {db}
                        </Checkbox>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              ) 
              :filter ==="Criteria" ?(
                                <Box key={filter}>
                  <Text fontWeight="bold" mb={2}>
                    Criterias:
                  </Text>
                  <Wrap spacing={4}>
                    {inclusionCriterias.map((cr) => (
                      <WrapItem key={cr}>
                        <Checkbox
                          isChecked={(localFilters.criteria  || []).includes(cr)}
                          onChange={() => toggleCriterias(cr)}
                        >
                          {cr}
                        </Checkbox>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>

              )
              : (
                <NumberInput
                  key={filter}
                  min={1900}
                  max={2100}
                  value={
                    filter === "Start Year"
                      ? localFilters.startYear ?? ""
                      : localFilters.endYear ?? ""
                  }
                  onChange={(_, n) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      [filter === "Start Year" ? "startYear" : "endYear"]: isNaN(n)
                        ? undefined
                        : n,
                    }))
                  }
                >
                  <NumberInputField placeholder={filter} />
                </NumberInput>
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleApply} colorScheme="blue" mr={3}>
              Apply
            </Button>
            <Button onClick={handleClear} mr={3}> Clear </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
