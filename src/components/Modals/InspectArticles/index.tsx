import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormLabel,Box, Flex, Divider } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { FaGear } from "react-icons/fa6";

interface InspectArticlesModalProps {
    show: (value: boolean) => void;
    action: "inspect" | "refuse";
    invalidEntries: string[];
}

function InspectArticlesModal({ show, invalidEntries }: InspectArticlesModalProps) {
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
                    {invalidEntries.length > 0 ? (
                        invalidEntries.map((entry, index) => (
                            <Box key={index}>{entry}</Box>
                        ))
                    ) : (
                        <p>No files to be processed</p>
                    )}
                </ModalBody>
                <Divider colorScheme="purple.400" />
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