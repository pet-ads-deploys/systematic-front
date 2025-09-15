// External library
import { Button, Flex } from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { IoIosCloseCircle } from "react-icons/io";
import { LuFeather } from "react-icons/lu";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
  
// Utils
import { capitalize } from "@features/shared/utils/helpers/formatters/CapitalizeText";

// Types
import type { ArticlePreviewProps } from "../../common/tables/StudyData";

export default function ArticleHeader({ studyData }: ArticlePreviewProps) {
  const statusIconMap: Record<
    string,
    { icon: React.ReactNode; color: string }
  > = {
    INCLUDED: { icon: <CheckCircleIcon color="green.500" />, color: "green" },
    DUPLICATED: { icon: <InfoIcon color="blue.500" />, color: "blue" },
    EXCLUDED: {
      icon: <IoIosCloseCircle color="red.500" size="1.4rem" />,
      color: "red",
    },
    UNCLASSIFIED: { icon: <WarningIcon color="yellow.500" />, color: "yellow" },
  };

  const priorityIconMap: Record<
    string,
    { icon: React.ReactNode; color: string }
  > = {
    VERY_LOW: {
      icon: <MdOutlineKeyboardDoubleArrowLeft color="#D32F2F" size="1.5rem" />,
      color: "red",
    },
    LOW: {
      icon: <MdOutlineKeyboardArrowLeft color="#FBC02D" size="1.5rem" />,
      color: "yellow",
    },
    HIGH: {
      icon: <MdOutlineKeyboardArrowRight color="#F57C00" size="1.5rem" />,
      color: "orange",
    },
    VERY_HIGH: {
      icon: <MdOutlineKeyboardDoubleArrowRight color="#388E3C" size="1.5rem" />,
      color: "green",
    },
  };

  const selectionStatus = statusIconMap[studyData.selectionStatus];
  const priorityLevel = priorityIconMap[studyData.readingPriority];
  const pathToReference = studyData.doi;

  const handleRedirectToReference = () => {
    if (!pathToReference) return;
    window.open(pathToReference, "_blank");
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-end"
      gap="0.8rem"
      fontFamily="sans-serif"
      flexWrap="wrap"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        h={{ base: "1.75rem", md: "2rem" }}
        px={{ base: 3, md: 4 }}
        gap={2}
        bg={`${selectionStatus.color}.100`}
        color={`${selectionStatus.color}.700`}
        fontWeight="semibold"
        fontSize={{ base: "0.5rem", md: "0.75rem" }}
        borderRadius=".35rem"
        boxShadow="sm"
        transition="all 0.3s ease"
        _hover={{
          bg: `${selectionStatus.color}.200`,
        }}
      >
        {selectionStatus.icon}
        {capitalize(studyData.selectionStatus.toLowerCase())}
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        h={{ base: "1.75rem", md: "2rem" }}
        minW="7.5rem"
        maxW="7.5rem"
        px={{ base: 3, md: 4 }}
        gap={2}
        bg={`${priorityLevel.color}.100`}
        color={`${priorityLevel.color}.700`}
        fontWeight="semibold"
        fontSize={{ base: "0.5rem", md: "0.75rem" }}
        borderRadius=".35rem"
        boxShadow="sm"
        transition="all 0.3s ease"
        _hover={{ bg: `${priorityLevel.color}.200` }}
      >
        {priorityLevel.icon}
        {capitalize(studyData.readingPriority.toLowerCase().replace("_", " "))}
      </Flex>
      {pathToReference && (
        <Button
          onClick={handleRedirectToReference}
          leftIcon={<LuFeather />}
          fontSize={{ base: "0.5rem", md: "0.75rem" }}
          fontWeight="bold"
          bg="blue.600"
          color="white"
          borderRadius=".35rem"
          boxShadow="md"
          transition="all 0.3s ease"
          h={{ base: "1.75rem", md: "2rem" }}
          px={{ base: 3, md: 4 }}
          _hover={{ bg: "blue.700", boxShadow: "lg" }}
          _active={{ bg: "blue.800" }}
        >
          Acessar DOI
        </Button>
      )}
    </Flex>
  );
}
