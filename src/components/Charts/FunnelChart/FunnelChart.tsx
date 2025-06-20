// External library
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

// Types
interface FunnelProps {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

export default function FunnelChart() {
  const funnelConfig: FunnelProps = {
    series: [
      {
        name: "Total studies:",
        data: [1200, 990, 548, 200, 50],
      },
    ],
    options: {
      chart: {
        type: "bar",
        dropShadow: {
          enabled: true,
        },
      },
      colors: ["#3c73b6"],
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          barHeight: "80%",
          isFunnel: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: "Studies Funnel",
        align: "left",
      },
      xaxis: {
        categories: [
          "Identificados",
          "Sem duplicados",
          "Após título/resumo",
          "Lidos",
          "Incluídos na revisão",
        ],
      },
    },
  };

  return (
    <Chart
      options={funnelConfig.options}
      series={funnelConfig.series}
      type={funnelConfig.options.chart?.type}
      height={500}
      width={800}
    />
  );
}
