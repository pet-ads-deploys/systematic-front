import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

type Props = {
  title: string;
  labels: (string |number)[];
  data: number[];
  color?: string;
  height?: number;
};

export default function BarChart({ title, labels, data, color = "#3c73b6", height = 450 }: Props) {
  const chartConfig = {
    series: [
      {
        name: "Studies",
        data,
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
        text: title,
        align: "left",
      },
    } as ApexOptions,
  };

  return <Chart options={chartConfig.options} series={chartConfig.series} type="bar" height={height} />;
}
