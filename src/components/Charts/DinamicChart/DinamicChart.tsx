import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import useFetchDataBases from "../../../hooks/fetch/useFetchDataBases";
import { fetchStudiesBySource } from "../../../hooks/reports/fetchStudiesBySources";
import { Box, Select, Text } from "@chakra-ui/react";

export default function DinamicChart() {
  const { databases } = useFetchDataBases();
  const [isLoading, setIsLoading] = useState(true);
  const [studiesData, setStudiesData] = useState<{ source: string; totalOfStudies: number }[]>([]);
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");

    useEffect(() => {
      const loadData = async () => {
        setIsLoading(true);
        if (databases.length === 0) {
          setIsLoading(false);
          return;
        }
        const data = await fetchStudiesBySource(databases); 
        setStudiesData(data);
        setIsLoading(false);
      };
  
      loadData(); 
    }, [databases]);


  const series =
    chartType === "pie" ? studiesData.map((item) => item.totalOfStudies)
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
      /*
      formatter: (val, opts) => {
        if (chartType === "pie") {
          return series[opts.seriesIndex] as number;
        }
        return val;
      },*/
    },
    ...(chartType === "bar"
      ? {
          xaxis: {
            categories: studiesData.map((item) => item.source),
          },
          colors:["#3c73b6"],
          plotOptions: {
            bar: {
              horizontal: false,
              dataLabels:{
                position:'top' ,
                }
            },
          },
         
        }
      : {
          labels: studiesData.map((item) => item.source),
        }),
  };

  if (isLoading) return <Text>Loading chart...</Text>;


 const width = chartType === "pie"? 550:700;
  return (
    <Box>
      <Box mb={4} maxW="200px">
        <Select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as "pie" | "bar")}
          bg="gray.300"
          borderRadius="md"
          size="sm">
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
        </Select>
      </Box>

      <Chart key={chartType} options={options} series={series} type={chartType} width={width} />
    </Box>
  );

}