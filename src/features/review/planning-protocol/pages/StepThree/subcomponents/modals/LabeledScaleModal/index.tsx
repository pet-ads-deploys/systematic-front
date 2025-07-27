import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import AddLabeledScaleTable from "@features/review/planning-protocol/pages/StepThree/subcomponents/inputs/labeledScale/AddLabeledScaleTable";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  show: Dispatch<SetStateAction<boolean>>;
  questionHolder: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  questions: Record<string, number>;
}

function LabeledScaleModal({ show, questionHolder, questions }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
    console.log(questions);
  }, [questions]);

  function handleSave() {
    onClose();
    show(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Values to labeled list
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <AddLabeledScaleTable
              questions={questions}
              questionHolder={questionHolder}
              placeholder="Insert your question here"
              text="question"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} m={"1rem"}>
            Close
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LabeledScaleModal;
