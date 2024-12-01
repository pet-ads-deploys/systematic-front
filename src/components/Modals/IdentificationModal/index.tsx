import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, Textarea, Box, IconButton, Flex } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { SetStateAction, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import useHandleExportedFiles from "../../../hooks/reviews/useHandleExportedFiles";
import DragAndDrop from "../../Inputs/DragAndDropInput";

interface IdentificationModalProps {
    show: (value: boolean) => void;
    action: "create" | "update";
    type: string;
    setSessions: React.Dispatch<SetStateAction<{id: string, systematicStudyd: string, userId: string, 
        searchString: string, additionalInfo: string, timestamp: string, 
        source: string, numberOfRelatedStudies: number }[]>>
}

function IdentificationModal({ show, action, type, setSessions }: IdentificationModalProps) {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { handleFile, referenceFiles, setReferenceFiles, 
        sendFilesToServer, setSource } = useHandleExportedFiles({setSessions: setSessions, type});

    useEffect(() => {
        setSource(type);
        onOpen();
    }, []);

    function close() {
        sendFilesToServer();
        show(false);
        onClose();
    }

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    function removeReferenceFile(index: number) {
        setReferenceFiles(referenceFiles.filter((_, i) => i !== index));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={"#263C56"}>
                    {action == "create" ? "New Search Session" : "Update Session"}
                    <ModalCloseButton onClick={close} />
                </ModalHeader>
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Date</FormLabel>
                        <Input type="date" defaultValue={getCurrentDate()} />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Search String</FormLabel>
                        <Textarea placeholder="Enter your search string" />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Comments</FormLabel>
                        <Textarea placeholder="Add comments" />
                    </FormControl>

                    {action == "create" && <FormControl mb={4}>
                        <FormLabel>Reference Files</FormLabel>
                        {referenceFiles.map((file, index) => (
                            <Flex key={index} alignItems="center" mb={2}>
                                <Box flex="1" border="1px" borderRadius="md" p={2}>
                                    {file.name}
                                </Box>
                                <IconButton
                                    aria-label="Remove file"
                                    icon={<DeleteIcon />}
                                    ml={2}
                                    gap={1}
                                    onClick={() => removeReferenceFile(index)}
                                />
                            </Flex>
                        ))}

                        <DragAndDrop handleFileChange={handleFile} />
                    </FormControl>}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={close}
                        backgroundColor={"#263C56"}
                        color={"#EBF0F3"}
                        boxShadow="sm"
                        _hover={{ bg: "#2A4A6D", boxShadow: "md" }}
                    >
                        {action == "create" ? "Create" : "Update"}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default IdentificationModal