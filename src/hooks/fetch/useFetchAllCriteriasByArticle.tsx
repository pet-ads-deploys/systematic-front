// External library
import { useEffect, useState } from "react";

// Hooks
import useFetchCriteriaForFocusedArticle from "./useCriteriaForFocusedArticle";
import useFetchInclusionCriteria from "./useFetchInclusionCriteria";
import useFetchExclusionCriteria from "./useFetchExclusionCriterias";
import useFocusedArticle from "../reviews/useFocusedArticle";

// Types
import { PageLayout } from "../../pages/Execution/subcomponents/LayoutFactory";
import useRevertCriterionState from "../reviews/useRevertCriterionState";

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

  const handlerUpdateCriteriasStructure = (
    key: OptionType,
    optionText: string,
    newValue: boolean
  ) => {
    if (!articleInFocus) return;

    setCriterias((prev) => {
      const current = prev[articleId];
      if (!current) return prev;

      const groupCriteria = current.options;
      if (!groupCriteria) return prev;

      const oppositeKey: OptionType =
        key === "INCLUSION" ? "EXCLUSION" : "INCLUSION";

      const oppositeHasActive = groupCriteria[oppositeKey].content.some(
        (crit) => crit.isChecked
      );

      if (newValue && oppositeHasActive) return prev;

      const updatedContent = groupCriteria[key].content.map((crit) =>
        crit.text === optionText ? { ...crit, isChecked: newValue } : crit
      );

      const isNowActive = updatedContent.some((crit) => crit.isChecked);

      const currentOption = groupCriteria[key].content.find(
        (crit) => crit.text === optionText
      );

      if (currentOption?.isChecked && newValue === false) {
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
