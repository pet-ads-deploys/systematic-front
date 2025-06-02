import { useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

type Props={
  criteria:"inclusion"|"exclusion"
};

export default function BarChart({criteria}:Props) {
const color = criteria === "inclusion" ? "#3c73b6" : "#C21807";


  const[chartConfig,setChartConfig] = useState<{
    series:{ name: string; data: number[] }[];
    options:ApexOptions;
  }>({
    series:[
      {
            name: "studies",
            data: [7, 2, 5,10],
      }
    ],
    options:{
      chart:{
        toolbar:{
          show:true,
          tools:{
            selection:true,
            download:true,
          },
        }
      },
      colors: [color], 
      plotOptions: {
        bar: {
          horizontal:false,
          dataLabels:{
            position:'top' ,
          
          }
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['C1','C2','C3','C4'],
      },

      title:{
        text: criteria == "inclusion"?"Inclusion Criteria":"Exclusion Criteria",
        align:"left"
      }
    }
    
  });
  return(
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type="bar"
      height={450}
    />

  );

}


