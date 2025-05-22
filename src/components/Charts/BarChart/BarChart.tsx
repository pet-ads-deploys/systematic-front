
import { useState } from "react";
import useFetchGraphicsData from "../../../hooks/fetch/useFetchGraphicsData";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";


function BarChart() {
  const[chartConfig,setChartConfig] = useState<{
    series:{ name: string; data: number[] }[];
    options:ApexOptions;
  }>({
    series:[
      {
            name: "included studies",
            data: [7, 2, 5,10],

      }
    ],
    options:{
      chart:{
        toolbar:{
          show:true,
          offsetX:0,
          offsetY:0,
          tools:{
            selection:true,
            download:true,
          },
        }
      },
      plotOptions: {
        bar: {
          horizontal:false,
          dataLabels:{
            position:'top' 
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['C1','C2','C3','C4'],
      },
      grid:{
        xaxis:{
          lines:{
              show:true
          }
        }
      },

      title:{
        text:"Included Studies by Inclusion Criteria",
        align:"left"
      }
    }
    
  });
  return(
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type="bar"
      height={500}
    />

  );

}

export default BarChart;
