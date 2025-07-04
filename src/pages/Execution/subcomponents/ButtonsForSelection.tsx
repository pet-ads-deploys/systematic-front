// External library
import { Box, Button, Flex } from "@chakra-ui/react";
import { MdOutlineLowPriority } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";
import { Tooltip } from "@chakra-ui/react";

// Context
// import AppContext from "../../../context/AppContext";

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
import ArticleInterface from "../../../../public/interfaces/ArticleInterface";

interface ButtonsForSelectionProps {
  page: PageLayout;
  articles: ArticleInterface[] | StudyInterface[];
  articleIndex: number;
  setSelectedArticleReview: React.Dispatch<React.SetStateAction<number>>;
}

export default function ButtonsForSelection({
  page,
  articles,
  articleIndex,
  setSelectedArticleReview,
}: ButtonsForSelectionProps) {
  const { handleResetStatusToUnclassified } = useResetStatus({ page });
  const { handleChangePriority } = useChangePriority();
  const { criterias: fetchedCriterias, handlerUpdateCriteriasStructure } =
    useFetchAllCriteriasByArticle({ page });

  if (!fetchedCriterias) return;

  const criteriaOptions = fetchedCriterias.options;

  const criteriaGroupDataMap: Record<
    OptionType,
    { data: OptionProps[]; isActive: boolean }
  > = {
    INCLUSION: {
      data: criteriaOptions.INCLUSION.content,
      isActive: criteriaOptions.INCLUSION.isActive,
    },
    EXCLUSION: {
      data: criteriaOptions.EXCLUSION.content,
      isActive: criteriaOptions.EXCLUSION.isActive,
    },
  };

  if (!criteriaGroupDataMap["INCLUSION"] || !criteriaGroupDataMap["EXCLUSION"])
    return;

  const isInclusionActive = criteriaOptions.INCLUSION.isActive;
  const isExclusionActive = criteriaOptions.EXCLUSION.isActive;

  const isUniqueArticle = articles.length == 1 ? true : false;

  function goToNextArticle() {
    const nextIndex = (articleIndex + 1) % articles.length;
    const nextArticle = articles[nextIndex] as ArticleInterface;
    setSelectedArticleReview(nextArticle.studyReviewId);
  }

  function goToPreviousArticle() {
    const prevIndex = (articleIndex - 1 + articles.length) % articles.length;
    const prevArticle = articles[prevIndex] as ArticleInterface;
    setSelectedArticleReview(prevArticle.studyReviewId);
  }

  const comboBoxGroups: Record<
    OptionType,
    {
      label: string;
      description: string;
      options: OptionProps[];
      isDisabled: boolean;
    }
  > = {
    INCLUSION: {
      label: "Include",
      description: "Add inclusion criteria",
      isDisabled: isExclusionActive,
      options: criteriaGroupDataMap["INCLUSION"].data || [],
    },
    EXCLUSION: {
      label: "Exclude",
      description: "Add exclusion criteria",
      isDisabled: isInclusionActive,
      options: criteriaGroupDataMap["EXCLUSION"].data || [],
    },
  };

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
            <Button onClick={goToPreviousArticle} bg="white">
              <IoIosArrowBack color="black" size="1.5rem" />
              prev
            </Button>
          </Tooltip>
        </Flex>
      )}
      <Flex sx={boxconteiner}>
        {Object.entries(comboBoxGroups).map(([groupKey, group]) => (
          <Tooltip
            key={groupKey}
            label={group.description}
            placement="top"
            hasArrow
            p=".5rem"
            borderRadius=".25rem"
          >
            <Box style={{ display: "inline-block" }}>
              <ComboBox
                page={page}
                text={group.label}
                groupKey={groupKey as OptionType}
                options={group.options}
                isDisabled={group.isDisabled}
                handlerUpdateCriteriasStructure={
                  handlerUpdateCriteriasStructure
                }
              />
            </Box>
          </Tooltip>
        ))}
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
            <Button onClick={goToNextArticle} bg="white">
              next
              <IoIosArrowForward color="black" size="1.5rem" />
            </Button>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
}
