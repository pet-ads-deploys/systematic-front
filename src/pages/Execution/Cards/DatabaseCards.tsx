import { Card, Box, Text } from "@chakra-ui/react";
import EventButton from "../../../components/Buttons/EventButton";
import DataBaseIcon from "../../../components/Icons/DataBaseIcon";
import AccordionDashboard from "./subcomponents/AccordionDashboard";
import { btnConteiner, card, conteiner, iconConteiner, testo } from "../styles/CardsStyle";
import IdentificationModal from "../../../components/Modals/IdentificationModal";
import { useEffect, useState } from "react";
import useGetSession from "../../../hooks/reviews/useGetSession";

interface DatabaseCardProps {
  text: string
}

interface actionsModal {
  action: "create" | "update";
}

export default function DataBaseCard({ text }: DatabaseCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [actionModal, setActionModal] = useState<"create" | "update">("create");
  const [sessions, setSessions] = useState<{id: string, systematicStudyd: string, userId: string, 
    searchString: string, additionalInfo: string, timestamp: string, source: string, numberOfRelatedStudies: number }[]>([])
  
  useEffect(() => {
    async function fetchSessions() {
      let response = await useGetSession(text);
      console.log(response.data.searchSessions);
      setSessions(response.data.searchSessions);
    }

    fetchSessions();
  }, []) 

  const handleOpenModal = ({ action }: actionsModal) => {
    setActionModal(action);
    setShowModal(true);
  };

  return (
    <Card sx={card}>
      <Box sx={conteiner} 
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"row"}
      bgColor={"#EBF0F3"}
      color={"#263C56"}
      >

        <Box sx={iconConteiner} ml={"1em"}>
          <DataBaseIcon/>
          <Text sx={testo}> {text}</Text>
        </Box>

        <Box sx={btnConteiner}>
          { <EventButton
            fontSize={14}
            bgColor={ "#263C56"}
            w={"80px"}
            color={"#EBF0F3"}
            borderRadius="50px"
            event={function (): void {
              handleOpenModal({action: 'create'});
            }}
            text={"View"}
            onClick={() => handleOpenModal({ action: "create" })}
          /> }
        </Box>

      </Box>

      <AccordionDashboard type={text} sessions={sessions} setSessions={setSessions} />
      {showModal == true && (
        <IdentificationModal show={setShowModal} action={actionModal} type={text} setSessions={setSessions} />
      )}
    </Card>
  );
}
