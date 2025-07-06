import { Text } from "@chakra-ui/react";

import BarChart from "../../../../components/Charts/BarChart/BarChart";
import { useFetchStudiesByStage } from "../../../../hooks/reports/useFetchStudiesByStage";
import useFetchStudiesByCriteria from "../../../../hooks/reports/useFetchStudiesByCriteria";

type Props = {
  criteria: "inclusion" | "exclusion";
  stage: "selection" | "extraction";
};

export default function CriteriaBarChart({ criteria, stage }: Props) {
  const color = criteria === "inclusion" ? "#3c73b6" : "#C21807";

  const { studiesByStage, isLoadingByStage } = useFetchStudiesByStage(stage);
  const { studiesByCriteria, isLoadingByCriteria } = useFetchStudiesByCriteria(criteria);

  if (isLoadingByCriteria || isLoadingByStage) return <Text>Loading chart...</Text>;

  const stageStudyIds =
    criteria === "inclusion"
      ? studiesByStage?.includedStudies.ids ?? []
      : studiesByStage?.excludedStudies.ids ?? [];

const criterias = studiesByCriteria?.criteria ?? {};
const labels = Object.keys(criterias);
const data = labels.map((label) =>
  criterias[label].filter((id) => stageStudyIds.includes(id)).length
);


  return (
    <BarChart
      title={criteria === "inclusion" ? "Inclusion Criteria" : "Exclusion Criteria"}
      labels={labels}
      data={data/*labels.map(()=>Math.floor(Math.random()*10)+1)*/}
      color={color}
    />
  );
}
