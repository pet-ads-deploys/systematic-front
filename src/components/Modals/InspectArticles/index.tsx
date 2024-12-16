import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormLabel,Box, Flex, Divider , Text} from "@chakra-ui/react";
import { Card, Heading, Stack } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react";
import { FaGear } from "react-icons/fa6";

interface InspectArticlesModalProps {
    show: (value: boolean) => void;
    action: "inspect" | "refuse";
    invalidEntries: {title: string; authors: string}[];
}

function InspectArticlesModal({ show, invalidEntries}: InspectArticlesModalProps) {
    const { onClose, onOpen } = useDisclosure();

    const handleOpen = () => {
        onOpen()};

    const handleClose = () => {
        show(false);
        onClose();
    };

    return (
        <Modal isOpen={handleOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={"#263C56"}>
                    <Flex gap={3}>
                        <FaGear size="2rem" />
                        <FormLabel fontWeight="bold" fontSize="larger">
                            Invalid articles entries
                        </FormLabel>
                    </Flex>
                    <ModalCloseButton onClick={handleClose} />
                </ModalHeader>
                <ModalBody>
                    <Stack spacing={4} overflowY="auto" minH="15rem" maxH="30rem" p="1.5rem" >
                        {invalidEntries.length > 0 ? (
                            invalidEntries.map((entry, index) => (
                                <Card
                                key={index}
                                width="100%"
                                borderWidth="1px"
                                borderRadius="lg"
                                p={4}
                                boxShadow="md"
                                bg="white"
                                _hover={{ boxShadow: "lg", bg: "gray.50" }}
                                textAlign="justify"
                                cursor="pointer"
                              >
                                <Heading size="md" mb={2}>
                                  {entry?.title || "Unknown"}
                                </Heading>
                                <Text color="gray.600" fontSize="sm">
                                  Author(s): {entry?.authors || "Unknown"}
                                </Text>
                              </Card>
                            ))
                          ) : (
                            <Text>No articles with problems</Text>
                          )}
                    </Stack>
                </ModalBody>
                <Divider/>
                <ModalFooter mt={3}>
                    <Button
                        onClick={handleClose}
                        backgroundColor={"#263C56"}
                        color={"#EBF0F3"}
                        boxShadow="sm"
                        _hover={{ bg: "#2A4A6D", boxShadow: "md" }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default InspectArticlesModal;