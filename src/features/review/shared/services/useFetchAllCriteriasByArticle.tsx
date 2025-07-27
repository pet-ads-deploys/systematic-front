// External library
import { useEffect, useState } from "react";

// Hooks
import useFetchCriteriaForFocusedArticle from "./useCriteriaForFocusedArticle";
import useFetchInclusionCriteria from "./useFetchInclusionCriteria";
import useFetchExclusionCriteria from "./useFetchExclusionCriterias";
import useFocusedArticle from "../hooks/useFocusedArticle";

// Types
import { PageLayout } from "../components/structure/LayoutFactory";
import useRevertCriterionState from "./useRevertCriterionState";

export type OptionType = "INCLUSION" | "EXCLUSION";

export type OptionProps = {
  text: string;
  isChecked: boolean;
};

export type CriteiriaProps = {
  options: Record<
    OptionType,
    {
      content: OptionProps[];
      isActive: boolean;
    }
  >;
};

type AllCriteriasByArticleProps = {
  page: PageLayout;
};

export default function useFetchAllCriteriasByArticle({
  page,
}: AllCriteriasByArticleProps) {
  const [criterias, setCriterias] = useState<Record<number, CriteiriaProps>>(
    {}
  );

  const { articleInFocus } = useFocusedArticle({ page });
  const articleId = articleInFocus ? articleInFocus.studyReviewId : -1;
  const { criteria } = useFetchCriteriaForFocusedArticle({
    articleId: articleId,
  });
  const inclusion = useFetchInclusionCriteria() || [];
  const exclusion = useFetchExclusionCriteria() || [];
  const { revertCriterionState } = useRevertCriterionState({ page });

  useEffect(() => {
    if (!inclusion || !exclusion || !articleInFocus) return;

    const groupOfCriteria: Record<OptionType, string[]> = {
      INCLUSION: criteria?.inclusionCriteria || [],
      EXCLUSION: criteria?.exclusionCriteria || [],
    };

    if (
      criterias[articleId] &&
      criteria?.inclusionCriteria.length === 0 &&
      criteria?.exclusionCriteria.length === 0
    )
      return;

    const inclusionMapped = inclusion.map((content) => ({
      text: content,
      isChecked: groupOfCriteria["INCLUSION"].includes(content),
    }));

    const inclusionStatus = inclusionMapped.some((crit) => crit.isChecked);

    const exclusionMapped = exclusion.map((content) => ({
      text: content,
      isChecked: groupOfCriteria["EXCLUSION"].includes(content),
    }));

    const exclusionStatus = exclusionMapped.some((crit) => crit.isChecked);

    setCriterias((prev) => ({
      ...prev,
      [articleId]: {
        options: {
          INCLUSION: {
            content: inclusionMapped,
            isActive: inclusionStatus,
          },
          EXCLUSION: {
            content: exclusionMapped,
            isActive: exclusionStatus,
          },
        },
      },
    }));
  }, [inclusion, exclusion, articleInFocus, criteria]);

  const captureGroupOfCriteria = (current: CriteiriaProps, key: OptionType) => {
    const groupCriteria = current.options;

    const oppositeKey: OptionType =
      key === "INCLUSION" ? "EXCLUSION" : "INCLUSION";

    return { groupCriteria, oppositeKey };
  };

  function hasConflictWithOppositeGroup(
    groupCriteria: CriteiriaProps["options"],
    oppositeKey: OptionType
  ) {
    return groupCriteria[oppositeKey].content.some((crit) => crit.isChecked);
  }

  function updateCriteriaContent(
    content: OptionProps[],
    optionText: string,
    newValue: boolean
  ): { updatedContent: OptionProps[]; isNowActive: boolean } {
    const updated = content.map((crit) =>
      crit.text === optionText ? { ...crit, isChecked: newValue } : crit
    );
    const isActive = updated.some((crit) => crit.isChecked);
    return { updatedContent: updated, isNowActive: isActive };
  }

  const shouldRevertState = (
    currentContent: OptionProps[],
    optionText: string,
    newValue: boolean
  ) => {
    const criteria = currentContent.find((crit) => crit.text === optionText);
    if (!criteria) return;
    return criteria.isChecked === true && newValue === false;
  };

  const handlerUpdateCriteriasStructure = (
    key: OptionType,
    optionText: string,
    newValue: boolean
  ) => {
    if (!articleInFocus) return;

    setCriterias((prev) => {
      const current = prev[articleId];
      if (!current) return prev;

      const { groupCriteria, oppositeKey } = captureGroupOfCriteria(
        current,
        key
      );
      if (!groupCriteria) return prev;

      if (
        newValue &&
        hasConflictWithOppositeGroup(groupCriteria, oppositeKey)
      ) {
        return prev;
      }

      const { updatedContent, isNowActive } = updateCriteriaContent(
        groupCriteria[key].content,
        optionText,
        newValue
      );

      if (shouldRevertState(groupCriteria[key].content, optionText, newValue)) {
        revertCriterionState([optionText]);
      }

      return {
        ...prev,
        [articleId]: {
          ...current,
          options: {
            ...groupCriteria,
            [key]: {
              content: updatedContent,
              isActive: isNowActive,
            },
          },
        },
      };
    });
  };

  return {
    criterias: criterias[articleId],
    handlerUpdateCriteriasStructure,
  };
}
