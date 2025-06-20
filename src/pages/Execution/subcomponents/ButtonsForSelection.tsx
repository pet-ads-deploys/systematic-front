// External library
import { useContext } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { MdOutlineLowPriority } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";
import { Tooltip } from "@chakra-ui/react";

// Context
import AppContext from "../../../components/Context/AppContext";

// Hooks
import useFetchAllCriteriasByArticle from "../../../hooks/fetch/useFetchAllCriteriasByArticle";
import useResetStatus from "../../../hooks/useResetStatus";
import useChangePriority from "../../../hooks/tables/useChangePriority";

// Components
import MenuOptions from "../../../components/Inputs/MenuOptions";
import ComboBox from "../../../components/Inputs/ComboBox";

// Styles
import {
  boxconteiner,
  buttonconteiner,
  conteiner,
} from "../styles/BtnSelectionStyles";

// Types
import type { StudyInterface } from "../../../../public/interfaces/IStudy";

import type { PageLayout } from "./LayoutFactory";

import type {
  OptionProps,
  OptionType,
} from "../../../hooks/fetch/useFetchAllCriteriasByArticle";

interface ButtonsForSelectionProps {
  page: PageLayout;
}

export default function ButtonsForSelection({
  page,
}: ButtonsForSelectionProps) {
  const context = useContext(AppContext);

  const { handleResetStatusToUnclassified } = useResetStatus({ page });
  const { handleChangePriority } = useChangePriority();
  const { criterias, handlerUpdateCriteriasStructure } =
    useFetchAllCriteriasByArticle({ page });

  if (!criterias) return;

  // console.log("criterios aqui no componente", criterias);

  const criteriaBase = criterias.options;

  const groupCriteriaMap: Record<
    OptionType,
    { data: OptionProps[]; isActive: boolean }
  > = {
    INCLUSION: {
      data: criteriaBase.INCLUSION.content,
      isActive: criteriaBase.INCLUSION.isActive,
    },
    EXCLUSION: {
      data: criteriaBase.EXCLUSION.content,
      isActive: criteriaBase.EXCLUSION.isActive,
    },
  };

  if (!groupCriteriaMap["INCLUSION"] || !groupCriteriaMap["EXCLUSION"]) return;

  const isInclusionActive = criteriaBase.INCLUSION.isActive;
  const isExclusionActive = criteriaBase.EXCLUSION.isActive;

  // console.log("todos criterios", groupCriteriaMap);

  const sortedStudies = context?.selectionStudies as StudyInterface[];
  const index = context?.selectionStudyIndex as number;

  const isUniqueArticle = sortedStudies.length == 1 ? true : false;

  function ChangeToNext() {
    const newIndex = (index + 1) % sortedStudies.length;
    context?.setSelectionStudyIndex(newIndex);
    context?.setSelectionStudy(sortedStudies[newIndex]);
  }

  function ChangeToPrevius() {
    const newIndex = (index - 1 + sortedStudies.length) % sortedStudies.length;
    context?.setSelectionStudyIndex(newIndex);
    context?.setSelectionStudy(sortedStudies[newIndex]);
  }

  return (
    <Flex sx={conteiner}>
      {isUniqueArticle ? null : (
        <Flex sx={buttonconteiner}>
          <Tooltip
            label="Previous article"
            placement="top"
            hasArrow
            p=".5rem"
            borderRadius=".25rem"
          >
            <Button onClick={ChangeToPrevius} bg="white">
              <IoIosArrowBack color="black" size="1.5rem" />
              prev
            </Button>
          </Tooltip>
        </Flex>
      )}
      <Flex sx={boxconteiner}>
        <Tooltip
          label="Add inclusion criteria"
          placement="top"
          hasArrow
          p=".5rem"
          borderRadius=".25rem"
        >
          <Box style={{ display: "inline-block" }}>
            <ComboBox
              page={page}
              text="Include"
              groupKey="INCLUSION"
              options={groupCriteriaMap["INCLUSION"].data}
              isDisabled={isExclusionActive}
              handlerUpdateCriteriasStructure={handlerUpdateCriteriasStructure}
            />
          </Box>
        </Tooltip>
        <Tooltip
          label="Add exclusion criteria"
          placement="top"
          hasArrow
          p=".5rem"
          borderRadius=".25rem"
        >
          <Box style={{ display: "inline-block" }}>
            <ComboBox
              page={page}
              text="Exclude"
              groupKey="EXCLUSION"
              options={groupCriteriaMap["EXCLUSION"].data}
              isDisabled={isInclusionActive}
              handlerUpdateCriteriasStructure={handlerUpdateCriteriasStructure}
            />
          </Box>
        </Tooltip>
        <Tooltip
          label="Reset article"
          placement="top"
          hasArrow
          p=".5rem"
          borderRadius=".25rem"
        >
          <Button
            color="black"
            bg="white"
            p="1rem"
            onClick={handleResetStatusToUnclassified}
          >
            <RiResetLeftLine color="black" size="1.5rem" />
          </Button>
        </Tooltip>

        <Tooltip
          label="Select reading priority"
          placement="top"
          hasArrow
          p=".5rem"
          borderRadius=".25rem"
        >
          <Box style={{ display: "inline-block" }}>
            <MenuOptions
              options={["Very Low", "Low", "High", "Very High"]}
              onOptionToggle={(option) =>
                handleChangePriority({ status: option })
              }
              icon={<MdOutlineLowPriority color="black" size="1.75rem" />}
            />
          </Box>
        </Tooltip>
      </Flex>

      {isUniqueArticle ? null : (
        <Flex sx={buttonconteiner}>
          <Tooltip
            label="Next article"
            placement="top"
            hasArrow
            p=".5rem"
            borderRadius=".25rem"
          >
            <Button onClick={ChangeToNext} bg="white">
              next
              <IoIosArrowForward color="black" size="1.5rem" />
            </Button>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
}
