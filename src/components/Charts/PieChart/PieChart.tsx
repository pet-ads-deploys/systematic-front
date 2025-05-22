
import { ApexOptions } from 'apexcharts';

import useFetchGraphicsData from "../../../hooks/fetch/useFetchGraphicsData";
import Chart from "react-apexcharts";
import { useState } from 'react';

//montar um array com o nome das bases;
//usar foreach para pegar o total de estudos de cada base; -montar um objeto
 

function PieChart() {
 const [chartConfig, setChartConfig] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [44, 55, 13, 43],
    options: {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
          },
          export: {
            width: 800,
        
          },
        },
      },
      labels: ["PubMed", " Scopus", "Web of Science", "SciELO"],
      title: {
        text: "Retrieved Studies by Search Source",
        align: "left",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (

        <Chart
          options={chartConfig.options}
          series={chartConfig.series}
          type="pie"
          width={380}
        />
  );
}

export default PieChart;
