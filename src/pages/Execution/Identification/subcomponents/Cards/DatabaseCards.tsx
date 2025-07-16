import { useState } from "react";
import { Card, Box, Text } from "@chakra-ui/react";

import EventButton from "../../../../../components/Buttons/EventButton";
import DataBaseIcon from "../../../../../components/Icons/DataBaseIcon";
import AccordionDashboard from "./subcomponents/AccordionDashboard";
import IdentificationModal from "../../../../../components/Modals/IdentificationModal";
import DeleteDatabaseModal from "../../../../../components/Modals/DeleteDatabase";

import useGetSession from "../../../../../hooks/reviews/useGetSession";

import {
  btnConteiner,
  card,
  conteiner,
  iconConteiner,
  testo,
} from "../../../styles/CardsStyle";

import { AddIcon } from "@chakra-ui/icons";
import { AiOutlineDelete } from "react-icons/ai";

interface DatabaseCardProps {
  text: string;
}

interface actionsModal {
  action: "create" | "update";
}

interface deleteDatabase {
  action: "delete" | "refuse";
}

export default function DataBaseCard({ text }: DatabaseCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [actionModal, setActionModal] = useState<"create" | "update">("create");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState<"delete" | "refuse">("delete");

  const { data, mutate } = useGetSession(text);

  const handleOpenModal = ({ action }: actionsModal) => {
    setActionModal(action);
    setShowModal(true);
  };

  const handleOpenDeleteModal = ({ action }: deleteDatabase) => {
    setdeleteModal(action);
    setShowDeleteModal(true);
  };

  const generateRandomId = (): string => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  return (
    <Card sx={card} key={generateRandomId()}>
      <Box
        sx={conteiner}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={"row"}
        bgColor={"#EBF0F3"}
        color={"#263C56"}
      >
        <Box sx={iconConteiner} ml={"1em"}>
          <DataBaseIcon />
          <Text sx={testo}> {text}</Text>
        </Box>

        <Box sx={btnConteiner}>
          {
            <EventButton
              fontSize={14}
              bgColor={"#263C56"}
              w={"60px"}
              color={"#EBF0F3"}
              borderRadius="50px"
              icon={<AddIcon />}
              event={function (): void {
                handleOpenModal({ action: "create" });
              }}
              text={"View"}
              onClick={() => handleOpenModal({ action: "create" })}
            />
          }
        </Box>
        <Box sx={btnConteiner}>
          {
            <EventButton
              fontSize={14}
              bgColor={"#263C56"}
              w={"60px"}
              color={"#EBF0F3"}
              icon={<AiOutlineDelete />}
              borderRadius="50px"
              event={function (): void {
                handleOpenDeleteModal({ action: "delete" });
              }}
              text={"Delete"}
              onClick={() => handleOpenDeleteModal({ action: "delete" })}
            />
          }
        </Box>
      </Box>
      {showDeleteModal && (
        <DeleteDatabaseModal
          show={setShowDeleteModal}
          action={deleteModal}
          sessions={data}
          mutate={mutate}
          databaseName={text}
        />
      )}
      <AccordionDashboard type={text} sessions={data} mutate={mutate} />
      {showModal && (
        <IdentificationModal
          show={setShowModal}
          action={actionModal}
          type={text}
          mutate={mutate}
        />
      )}
    </Card>
  );
}
