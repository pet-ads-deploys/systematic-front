// External library
import { useEffect, useState } from "react";

// Hooks
import useFetchInclusionCriteria from "./useFetchInclusionCriteria";
import useFetchExclusionCriteria from "./useFetchExclusionCriterias";
import useFocusedArticle from "../reviews/useFocusedArticle";

// Types
import { PageLayout } from "../../pages/Execution/subcomponents/LayoutFactory";

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
  const inclusion = useFetchInclusionCriteria() || [];
  const exclusion = useFetchExclusionCriteria() || [];

  const articleId = articleInFocus ? articleInFocus.studyReviewId : -1;

  useEffect(() => {
    if (!inclusion || !exclusion || !articleInFocus) return;

    if (criterias[articleId]) return;

    setCriterias((prev) => ({
      ...prev,
      [articleId]: {
        options: {
          INCLUSION: {
            content: inclusion.map((content) => ({
              text: content,
              isChecked: false,
            })),
            isActive: false,
          },
          EXCLUSION: {
            content: exclusion.map((content) => ({
              text: content,
              isChecked: false,
            })),
            isActive: false,
          },
        },
      },
    }));
  }, [inclusion, exclusion, articleInFocus]);


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
