import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, Textarea, Box, IconButton, Flex, Divider } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import UseDeleteSession from "../../../hooks/reviews/useDeleteSession";
import {useEffect } from "react";
import { IoIosWarning } from "react-icons/io";
import { useToast } from "@chakra-ui/react";

interface DeleteDatabaseModalProps {
    show: (value: boolean) => void;
    action: "delete" | "refuse";
    sessions:  {
        id: string, 
        systematicStudyd: string, 
        userId: string,    
        searchString: string, 
        additionalInfo: string, 
        timestamp: string, 
        source: string, 
        numberOfRelatedStudies: number
    }[];
}

function DeleteDatabaseModal({ show, sessions}: DeleteDatabaseModalProps) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        onOpen();
    }, []);

    function close() {
        show(false);
        onClose();
    }

    const deleteAllReferences = async () => {
        try {
            sessions.map(async (study) => {
                await UseDeleteSession(study.id);
            });

            toast({
                title: "All Study Sessions Deleted!",
                description: "Your study sessions have been successfully removed.",
                status: "success",
                duration: 4500,
                isClosable: true,
                position: "top",
              });
              close()    
        } catch (err) {
            console.log(err);
            toast({
                title: "Action Failed",
                description: "Please ensure the field is filled before proceeding.",
                status: "error",
                duration: 4500,
                isClosable: true,
                position: "top",
              });
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={"#263C56"}>
                    <ModalCloseButton onClick={close} />
                </ModalHeader>
                <ModalBody>
                    <Flex>
                     <IoIosWarning width={4}/>
                     Are you sure you want to delete all references in database? This action is permanent and cannot be undone.
                    </Flex>
                </ModalBody>
                <Divider colorScheme="purple.400"/>
                <ModalFooter>
                    <Flex alignItems="center" justifyContent="space-evenly" gap={2}>
                    <Button onClick={close}
                        backgroundColor={"#263C56"}
                        color={"#EBF0F3"}
                        boxShadow="sm"
                        _hover={{ bg: "#2A4A6D", boxShadow: "md" }}
                    >
                       Cancel</Button>
                       <Button onClick={deleteAllReferences}
                        backgroundColor={"#263C56"}
                        color={"#EBF0F3"}
                        boxShadow="sm"
                        _hover={{ bg: "#2A4A6D", boxShadow: "md" } 
                    }
                    >
                       Remove</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteDatabaseModal