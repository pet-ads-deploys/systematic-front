import { useState } from "react";
import { Accordionbtn, accordion } from "../../styles/CardsStyle";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import IdentificationModal from "../../../../components/Modals/IdentificationModal";
import SessionPrev from "./SessionPrev";
import IAccordionDashBoard from '../../../../../public/interfaces/IAccordionDashboard'
import UseDeleteSession from "../../../../hooks/reviews/useDeleteSession";
import InspectArticlesModal from "../../../../components/Modals/InspectArticles";
import useHandleExportedFiles from "../../../../hooks/reviews/useHandleExportedFiles";

interface actionsModal {
  action: "create" | "update";
}

interface inspectModal {
  action: "inspect" | "refuse";
}

export default function AccordionDashboard({ type, sessions, setSessions }: IAccordionDashBoard) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionModal, setActionModal] = useState<"create" | "update">("create");

  const [showInspectArticlesModal, setShowInspectArticlesModal] = useState(false);
  const [ispectModal, setIspectModal] = useState<"inspect" | "refuse">("inspect");

  const { invalidEntries } = useHandleExportedFiles({
    setSessions,
    type,
});

  const getTotalStudiesRelated = () => {
    let totalStudies = 0;

    sessions.map((item) => {
      totalStudies += item.numberOfRelatedStudies;
    });

    return totalStudies;
  };

  const handleOpenModal = ({ action }: actionsModal) => {
    setActionModal(action);
    setShowModal(true);
  };

  const handleInspectOpenModal = ({ action }: inspectModal) => {
    setIspectModal(action);
    setShowInspectArticlesModal(true);
  };

  const handleDeleteStudies = (id: string) => {
    UseDeleteSession(id);
    setSessions(sessions.filter((prevStudies) => prevStudies.id != id));
  };

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Accordion allowToggle sx={accordion} onChange={handleAccordionToggle}>
      {showModal == true && (
        <IdentificationModal
          show={setShowModal}
          action={actionModal}
          type={type}
          setSessions={setSessions}
        />
      )}

      <AccordionItem>
        <AccordionButton sx={Accordionbtn}>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>
          {sessions && sessions.length > 0 ? (
            <>
              <Flex
                flex={1}
                fontWeight="bold"
                justifyContent="space-between"
                alignItems="center"
                py={2}
                gap={"3rem"}
              >
                <Flex>
                  <Text
                    
                    textAlign="left"
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                  >
                    Date
                  </Text>
                </Flex>

                <Flex flex={1}>
                  <Text textAlign="center">
                    Studies
                  </Text>
                </Flex>
              </Flex>
              {sessions.map((item, index) => {
                return (
                  <SessionPrev
                    key={index}
                    sessionId={item.id}
                    handleOpenModal={handleOpenModal}
                    handleDelete={handleDeleteStudies}
                    handleInspectOpenModal={handleInspectOpenModal}
                    timestamp={item.timestamp}
                    numberOfStudies={item.numberOfRelatedStudies}
                  />
                );
              })}
              {showInspectArticlesModal &&(
                <InspectArticlesModal
                  show={setShowInspectArticlesModal}
                  action={ispectModal}
                  invalidEntries={invalidEntries}
                />
              )}
              <Box>
                <Text mt="1rem">Total: {getTotalStudiesRelated()}</Text>
              </Box>
            </>
          ) : (
            <Text>Studies not found</Text>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}