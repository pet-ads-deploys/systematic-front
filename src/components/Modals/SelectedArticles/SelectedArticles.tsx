import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  Tooltip,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  Flex,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";

import { SelectedArticlesProps } from "../../../hooks/tables/useSelectedArticles";
import { tooltip } from "../../../pages/Execution/styles/CardsStyle";
// import useSendDuplicatedStudies from "../../../hooks/tables/useSendDuplicatedStudies";
import { RiCheckboxMultipleFill } from "react-icons/ri";

interface SelectArticlesTableProps {
  articles: Record<number, SelectedArticlesProps>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function SelectedArticles({
  articles,
  showModal,
}: SelectArticlesTableProps) {
  const [listArticles, setListArticles] = useState<
    { id: number; title: string }[]
  >([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const mappedArticles = Object.values(articles).map(({ id, title }) => ({
      id,
      title,
    }));
    setListArticles(mappedArticles);
  }, [articles]);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    onOpen();
  }, []);

  console.log("lista de artigos que vão aparecer no modal", listArticles);

  return (
    showModal && (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent h="80vh" w="50vw">
          <ModalHeader color={"#263C56"}>
            <FormControl
              mt={3}
              display="flex"
              mb={4}
              gap={3}
              justifyContent="left"
              alignItems="center"
            >
              <Flex gap={3} alignItems="center" justifyContent="center">
                <RiCheckboxMultipleFill size="1.5rem" />
                <Text fontWeight="bold" fontSize="1.25rem">
                  Selected articles
                </Text>
              </Flex>
            </FormControl>
            <ModalCloseButton onClick={handleClose} />
          </ModalHeader>
          <ModalBody alignItems="center" justifyContent="center">
            <TableContainer bg="white" overflowX="hidden">
              <Table
                variant="unstyled"
                colorScheme="#263C56"
                size="md"
                justifyContent="center"
                alignItems="center"
                h="90%"
                overflow="auto"
              >
                <Thead>
                  <Tr>
                    <Th
                      textAlign="center"
                      color="#263C56"
                      fontSize="larger"
                      p="2rem 2rem 1rem 0"
                      textTransform="capitalize"
                      borderBottom="3px solid #C9D9E5"
                      w="15%"
                      cursor="pointer"
                    >
                      ID
                    </Th>
                    <Th
                      textAlign="center"
                      color="#263C56"
                      fontSize="larger"
                      p="2rem 2rem 1rem 0"
                      textTransform="capitalize"
                      borderBottom="3px solid #C9D9E5"
                      w="85%"
                      cursor="pointer"
                    >
                      Title
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listArticles.map((art) => {
                    return (
                      <Tr key={art.id}>
                        <Td>
                          <Tooltip
                            borderRadius=".5rem"
                            sx={tooltip}
                            label={art.id.toString()}
                            hasArrow
                          >
                            {String(art.id).padStart(5, "0")}
                          </Tooltip>
                        </Td>
                        <Td>
                          <Tooltip
                            borderRadius=".5rem"
                            sx={tooltip}
                            label={art.title.toString()}
                            hasArrow
                          >
                            {art.title}
                          </Tooltip>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <Flex w="100%" p="1.5rem">
            <Text>Quantity of articles: {listArticles.length}</Text>
          </Flex>
        </ModalContent>
      </Modal>
    )
  );
}
