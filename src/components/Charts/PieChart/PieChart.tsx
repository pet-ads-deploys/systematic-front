import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";



type Props = {
  title: string;
  labels: (string | number)[];
  data: number[];
  width?: number;
};

export default function PieChart({ title, labels, data, width = 700} :Props) {

  const chartConfig = {
    series:data,
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      labels:labels,
      title: {
        text: title,
        align: "left",
      },
      dataLabels: {
        enabled: true,
        formatter: (_val, opts) =>{
          return opts.w.config.series[opts.seriesIndex];
        }
      },

    } as ApexOptions,
  };
  return (
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type="pie"
      width={width}
    />
  );
}
