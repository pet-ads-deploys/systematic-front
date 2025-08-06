import { useContext } from "react";
import { Button, Flex } from "@chakra-ui/react";

import StudySelectionContext from "@features/review/shared/context/StudiesSelectionContext";
import { UseChangeStudySelectionStatus } from "../../../../services/useChangeStudySelectionStatus";
import useSendDuplicatedStudies from "../../../../services/useSendDuplicatedStudies";
import { FaCheckCircle, FaEye, FaTrashAlt } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";

const buttonSX = {
  display: "flex",
  borderRadius: ".25rem",
  gap: ".25rem",
  justifyContent: "center",
  alignItems: "center",
  transition: "0.3s ease-in-out",
  boxShadow: "md",
  p: "0 1rem",
  w: "100%",
  h: "2.5rem",
  color: "white",
};

interface ButtonsForMultipleSelectionProps {
  onShowSelectedArticles: (showSelected: boolean) => void;
  isShown: boolean;
}

export default function ButtonsForMultipleSelection({
  onShowSelectedArticles,
  isShown,
}: ButtonsForMultipleSelectionProps) {
  const studyContext = useContext(StudySelectionContext);

  const duplicatedStudies = studyContext?.deletedArticles.filter(
    (art) => art != studyContext?.firstSelected
  );

  const { sendDuplicatedStudies } = useSendDuplicatedStudies({
    firstSelected: studyContext?.firstSelected || 0,
    duplicatedStudies: duplicatedStudies || [],
  });

  const articles = studyContext?.selectedArticles;

  const handleSendDuplicatedStudies = () => {
    sendDuplicatedStudies();
    studyContext?.clearSelectedArticles();
    onShowSelectedArticles(false);
  };

  const handleSendExcludedStudies = () => {
    if (!articles || Object.keys(articles).length <= 1) return;
    UseChangeStudySelectionStatus({
      status: "EXCLUDED",
      studyReviewId: [...Object.values(articles).map((art) => art.id)],
      criterias: [],
    });
    studyContext?.clearSelectedArticles();
    onShowSelectedArticles(false);
  };

  return articles && Object.keys(articles).length > 1 ? (
    <Flex gap=".5rem">
      {!isShown ? (
        <Button
          sx={buttonSX}
          bg="#6B8E23"
          border="2px solid #6B8E23"
          _hover={{ bg: "white", color: "#6B8E23" }}
          transition="0.2s ease-in-out"
          onClick={() => {
            onShowSelectedArticles(!isShown);
          }}
          leftIcon={<FaEye />}
        >
          Show selected
        </Button>
      ) : (
        <Button
          sx={buttonSX}
          bg="#6B8E23"
          border="2px solid #6B8E23"
          _hover={{ bg: "white", color: "#6B8E23" }}
          transition="0.2s ease-in-out"
          onClick={() => {
            onShowSelectedArticles(!isShown);
          }}
          leftIcon={<FaEye />}
        >
          Show all
        </Button>
      )}

      <Button
        sx={buttonSX}
        bg="#3182CE"
        border="2px solid #3182CE"
        _hover={{ bg: "white", color: "#3182CE" }}
        transition="0.2s ease-in-out"
        onClick={handleSendDuplicatedStudies}
        leftIcon={<FaCheckCircle />}
      >
        Mark to duplicated
      </Button>
      <Button
        sx={buttonSX}
        bg="#951717"
        border="2px solid #951717"
        _hover={{ bg: "white", color: "#951717" }}
        transition="0.2s ease-in-out"
        onClick={handleSendExcludedStudies}
        leftIcon={<FaTrashAlt />}
      >
        Mark to excluded
      </Button>
      <Button
        sx={buttonSX}
        bg="#F6BB42"
        border="2px solid #F6BB42"
        _hover={{ bg: "white", color: "#F6BB42" }}
        transition="0.2s ease-in-out"
        onClick={() => {
          studyContext.clearSelectedArticles();
          onShowSelectedArticles(false);
        }}
        leftIcon={<MdOutlineCleaningServices />}
      >
        Clear selection
      </Button>
    </Flex>
  ) : null;
}
