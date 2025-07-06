// External library
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

// Types
type Props ={
  title:string;
  categories:(string| number)[];
  data:number[];
  color?:string;
  height?:number;
  width?:number;
}

export default function LineChart({title,categories,data,color="#3c73b6",height=450,width=700}:Props) {
   

  const chartConfig ={
    series: [
      {
        name: "Studies",
        data: data,
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
      colors: [color],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text:title ,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories
      },
    }as ApexOptions,
  };

  return (
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type="line"
      height={height}
      width={width}

    />
  );
}
