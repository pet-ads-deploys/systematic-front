import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react";
import AddPickListTable from "../../AddDataFields/pickList/AddPickListTable";
import { Dispatch, SetStateAction } from "react";

interface Props{
    show: Dispatch<SetStateAction<boolean>>;
    questionHolder: React.Dispatch<React.SetStateAction<string[]>>
    questions: string[];
}

function PickListModal({show, questionHolder, questions}: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    
    useEffect(() => {
        onOpen();
    }, []);

    function close(){
        show(false);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Insert the options
                    <ModalCloseButton onClick={close}/>
                </ModalHeader>
                <ModalBody>
                    <AddPickListTable text="Options" placeholder="Options here" questionHolder={questionHolder} questions={questions} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={close}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PickListModal