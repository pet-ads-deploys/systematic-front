import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import useFetchDataBases from "../../../hooks/fetch/useFetchDataBases";
import { FetchStudiesBySource } from "../../../hooks/reports/fetchStudiesBySources";
import useFetchStudiesBySource from "../../../hooks/reports/useFetchStudiesBySource";

export default function PieChart() {
  const { databases } = useFetchDataBases();
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); 
      if (databases.length === 0) return;

      try {
        const data = await FetchStudiesBySource(databases);
        setLabels(data.map((item) => item.label));
        setSeries(data.map((item) => item.total));
      } catch (error) {
        console.error("Erro ao carregar gráfico:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [databases]);

  const chartConfig = {
    series:series,
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      labels:labels,
      title: {
        text: "Retrieved Studies by Search Source",
        align: "left",
      },
    } as ApexOptions,
  };

  if (loading) return <p>Loading chart...</p>;

  return (
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type="pie"
      width={400}
    />
  );
}
