import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

import useFetchStudiesByCriteria from "../../../hooks/reports/useFetchStudiesByCriteria";
import { useFetchStudiesByStage } from "../../../hooks/reports/useFetchStudiesByStage";
import { Text } from "@chakra-ui/react";

type Props = {
  criteria: "inclusion" | "exclusion";
  stage: "selection"| "extraction";
};

export default function BarChart({ criteria,stage }: Props) {
  const color = criteria === "inclusion" ? "#3c73b6" : "#C21807";

  const {studiesByStage,isLoadingByStage}=useFetchStudiesByStage(stage);
  const {studiesByCriteria, isLoadingByCriteria} = useFetchStudiesByCriteria(criteria);
  console.log(studiesByCriteria?.criteria+"aaaaaaa"+criteria);
  console.log(studiesByStage?.excludedStudies.ids+"aaaaaaa"+stage);
  console.log(studiesByStage?.includedStudies.ids+"aaaaaaa"+stage);
  
  const studiesByStageIds=  criteria === "inclusion" ? studiesByStage?.includedStudies.ids ?? [] : studiesByStage?.excludedStudies.ids ?? [];

  const criterias = Object.entries(studiesByCriteria?.criteria ?? {});
  const labels = criterias.map(([description]) => description);
  const data = criterias.map(([, studyIds]) =>
    studyIds.filter(id =>  studiesByStageIds.includes(id)).length
  );

  const chartConfig = {
    series: [
      {
        name: "Studies",
        data: data/* labels.map(()=>Math.floor(Math.random()*10)+1)*/

      },
    ],
    options: {
      chart: {
        toolbar: {
          show: true,
          tools: {
            selection: true,
            download: true,
          },
        },
      },
      colors: [color],
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      tooltip: {
        custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
          const fullText = labels[dataPointIndex];
          return `
            <Box style="padding: 8px; max-width: 300px; white-space: normal;">
              <Text>C${dataPointIndex + 1}: ${fullText}</Text>
            </Box>`;
        },
      },
      xaxis: {
        categories: labels.map((_,indexOf)=>(`C${indexOf+1}`))
      },
      title: {
        text: criteria === "inclusion" ? "Inclusion Criteria" : "Exclusion Criteria",
        align: "left",
      },
    } as ApexOptions,
  };

  if (isLoadingByCriteria || isLoadingByStage) return <Text>Loading chart...</Text>;

  return (
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type="bar"
      height={450}
    />
  );
}
