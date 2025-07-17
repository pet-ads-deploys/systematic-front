import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import StudyEditingInput from "../../../../../../../../components/Inputs/StudyEditingInput";
import { StudyInterface } from "../../../../../../../../types/IStudy";

interface StudyEdtionModalProps {
  isOpen: boolean;
  onClose: () => void;
  study: StudyInterface;
}

export default function StudyEdtionModal({
  isOpen,
  onClose,
  study,
}: StudyEdtionModalProps) {
  const [title, setTitle] = useState(study.title);
  const [authors, setAuthors] = useState(study.authors);
  const [abstract, setAbstract] = useState(study.abstract);
  const [doi, setDoi] = useState(study.doi);
  //const [studyType, setStudyType] = useState(study.studyType);
  const [venue, setVenue] = useState(study.venue);
  //const [keywords, setKeywords] = useState(study.keywords);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"8xl"}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader color="white" bg="gray.800">
            <Text>Editing Study</Text>
          </ModalHeader>
          <ModalCloseButton bg="white" />

          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <StudyEditingInput
                type="text"
                value={title}
                setValue={setTitle}
              />
              <FormLabel>Authors</FormLabel>
              <StudyEditingInput
                type="text"
                value={authors}
                setValue={setAuthors}
              />
              <FormLabel>Abstract</FormLabel>
              <StudyEditingInput
                type="text"
                value={abstract}
                setValue={setAbstract}
              />
              <FormLabel>DOI</FormLabel>
              <StudyEditingInput
                type="text"
                value={doi as string}
                setValue={
                  setDoi as React.Dispatch<React.SetStateAction<string>>
                }
              />
              <FormLabel>Venue</FormLabel>
              <StudyEditingInput
                type="text"
                value={venue}
                setValue={setVenue}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter color="white" bg="gray.800"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
