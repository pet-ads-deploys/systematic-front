import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Button, Text, Tr, Td } from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { MdOutlineSdCardAlert } from "react-icons/md";
import { InvalidEntry } from "../../../../components/Context/StudiesSelectionContext";

interface actionsModal {
  action: "create" | "update";
}

// interface inspectArticlesModal {
//   action: "inspect" | "refuse";
// }
interface Props {
  handleOpenModal: (action: actionsModal) => void;
  handleDelete: (id: string) => void;
  // handleInspectOpenModal: (action: inspectArticlesModal) => void;
  timestamp: string;
  numberOfStudies: number;
  sessionId: string;
  invalidEntries: InvalidEntry[] | undefined;
  sessionIndex: number;
}

const SessionPrev = ({
  handleOpenModal,
  handleDelete,
  timestamp,
  numberOfStudies,
  sessionId,
  invalidEntries,
  sessionIndex,
}: // handleInspectOpenModal,
Props) => {
  const date = new Date(timestamp);
  let day, month;
  const toast = useToast();

  const handleToastAlert = () => {
    toast({
      title: "Studies without references associated",
      description: "There are no references associated with this study",
      status: "info",
      duration: 4500,
      isClosable: true,
      position: "top",
    });
  };

  day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  if (date.getMonth() < 9) month = `0${date.getMonth() + 1}`;
  else month = `${date.getMonth() + 1}`;

  const sessionDate = day + "/" + month;
  const hasErrors = (sessionIndex: number) => {
    console.log(
      "valores da minha função hasErrors:",
      invalidEntries,
      sessionIndex
    );
    return (
      invalidEntries &&
      invalidEntries[sessionIndex] &&
      invalidEntries[sessionIndex].entries &&
      invalidEntries[sessionIndex].entries.length > 0
    );
  };

  return (
    <Tr>
      <Td>
        <Text textAlign="left" whiteSpace={"nowrap"} overflow={"hidden"}>
          {sessionDate}
        </Text>
      </Td>

      <Td>
        <Text textAlign="center" width="100%">
          {numberOfStudies}
        </Text>
      </Td>

      <Td>
        <Flex gap="5px">
          {numberOfStudies && numberOfStudies > 0 ? (
            <Button
              as={Link}
              to={`/newReview/identification/${sessionId}`}
              colorScheme="gray"
              height="35px"
              flex={1}
            >
              <FaRegEye />
            </Button>
          ) : (
            <Button
              flex={1}
              colorScheme="gray"
              height="35px"
              onClick={handleToastAlert}
            >
              <IoEyeOffOutline />
            </Button>
          )}
          <Button
            flex={1}
            colorScheme="gray"
            height="35px"
            onClick={() => handleOpenModal({ action: "update" })}
          >
            <EditIcon />
          </Button>
          <Button
            flex={1}
            colorScheme="gray"
            height="35px"
            onClick={() => handleDelete(sessionId)}
          >
            <DeleteIcon />
          </Button>
          {/* <Button
            flex={1}
            colorScheme="gray"
            height="35px"
            onClick={() => handleInspectOpenModal({ action: "inspect" })}
          >
            <MdOutlineSdCardAlert size="20px" />
          </Button> */}
          {hasErrors(sessionIndex) && (
            <Button flex={1} colorScheme="red" height="35px">
              <MdOutlineSdCardAlert size="20px" />
            </Button>
          )}
        </Flex>
      </Td>
    </Tr>
  );
};

export default SessionPrev;
