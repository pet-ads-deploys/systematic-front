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

  const mockEntries = [
    {
        "title" : "Recent Advancements in Artificial Intelligence Research and Development",
        "authors": "John Doe, Jane Smith, Alice Brown, Michael Lee",
    },
    {
        "title" : "Investigating the Effects of Drug X on Patient Recovery and Outcomes",
        "authors": "Dr. Alice Johnson, Dr. Robert White, Dr. Emily Brown, Dr. William Green",
    },
    {
        "title" : "The Long-term Impact of Childhood Trauma on Adult Behavior and Mental Health",
        "authors": "Dr. Emily Davis, Dr. Sarah Thompson, Dr. James Wilson, Dr. Laura Martinez",
    },
    {
        "title" : "Analyzing the Impact of Tax Policies on Economic Growth and Development",
        "authors": "Dr. Michael Brown, Dr. David Johnson, Dr. Linda Lee, Dr. Charles Green",
    }
];

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
                  invalidEntries={mockEntries}
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