import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useState } from "react";
import useFetchDataBases from "../../../features/review/shared/services/useFetchDataBases";

import { Box, Select, Text } from "@chakra-ui/react";
import useFetchStudiesBySource from "../../../hooks/reports/useFetchStudiesBySource";

export default function DinamicChart() {
  const { databases } = useFetchDataBases();

  const { studiesData, isLoading } = useFetchStudiesBySource(databases);
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");

  const series =
    chartType === "pie"
      ? studiesData.map((item) => item.totalOfStudies)
      : [
          {
            name: "studies",
            data: studiesData.map((item) => item.totalOfStudies),
          },
        ];

  const options: ApexOptions = {
    chart: {
      type: chartType,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: "Retrieved Studies by Search Source",
      align: "left",
    },
    dataLabels: {
      enabled: true,
    },
    ...(chartType === "bar"
      ? {
          xaxis: {
            categories: studiesData.map((item) => item.source),
          },
          colors: ["#3c73b6"],
          plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: "top",
              },
            },
          },
        }
      : {
          labels: studiesData.map((item) => item.source),
        }),
  };

  if (isLoading) return <Text>Loading chart...</Text>;

  const width = chartType === "pie" ? 650 : 700;
  return (
    <Box>
      <Box mb={4} maxW="200px">
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as "pie" | "bar")}
          bg="gray.300"
          borderRadius="md"
          size="sm"
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
        </Select>
      </Box>

      <Chart
        key={chartType}
        options={options}
        series={series}
        type={chartType}
        width={width}
      />
    </Box>
  );
}
