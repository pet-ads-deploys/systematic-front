// External library
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

// Types
interface LineChartProps {
  series: { name: string; data: number[] }[];
  options: ApexOptions;
}

export default function LineChart() {
  const chartConfig: LineChartProps = {
    series: [
      {
        name: "studies",
        data: [3, 4, 6, 8, 13, 7, 24, 3, 6, 9, 12, 23],
      },
    ],
    options: {
      chart: {
        height: 350,
        toolbar: {
          show: true,
          tools: {
            selection: true,
            download: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      colors: ["#3c73b6"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Included Studies by Year",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          2013, 2014, 2015, 2016, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
          2025,
        ],
      },
    },
  };

  return (
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type="line"
      height={450}
      width={700}
    />
  );
}
