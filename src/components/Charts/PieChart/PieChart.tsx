import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import useFetchDataBases from "../../../hooks/fetch/useFetchDataBases";
import { fetchStudiesBySource } from "../../../hooks/reports/fetchStudiesBySources";


export default function PieChart() {

  const { databases } = useFetchDataBases();
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
  const loadData = async () => {
    setIsLoading(true);
    if (databases.length === 0) {
      setIsLoading(false);
      return;
    }
    const data = await fetchStudiesBySource(databases);
    setLabels(data.map((item) => item.source));
    setSeries(data.map((item) => item.totalOfStudies));
    setIsLoading(false);
  };

  loadData();
}, [databases]);


  const chartConfig = {
    series:series,
    options: {
      chart: {
        toolbar: {
          show: true,
          export:{
            width:700
          }
        },
      },
      labels:labels,
      title: {
        text: "Retrieved Studies by Search Source",
        align: "left",
      },
      /*
      dataLabels: {
        enabled: true,
        formatter: (_val, opts) =>{
          return opts.w.config.series[opts.seriesIndex];
        }
      },*/

    } as ApexOptions,
  };

  if (isLoading) return <p>Loading chart...</p>;

  return (
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type="pie"
      width={550}
    />
  );
}
