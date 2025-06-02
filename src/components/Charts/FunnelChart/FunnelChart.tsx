
import { useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";



export default function FunnelChart(){
    const [funnelConfing,setFunnelConfig] = useState<{
        series:{name:string,data:number[]}[],
        options:ApexOptions;
    }>({
        series:[
            {
                name:"total studies:",
                data: [1200, 990, 548, 200, 50],
            }

        ],
        options:{
            chart:{
                type:"bar",
                dropShadow:{
                    enabled:true
                },

            },
              colors: ['#3c73b6'], 
             plotOptions:{
                bar:{
                    borderRadius:0,
                    horizontal:true,
                    barHeight:"80%",
                    isFunnel:true,
                }

            },
            dataLabels:{
                enabled:true,
            },
            title:{
                text:'Studies Funnel',
                align:"left"
            },
            xaxis:{
                categories:[
                    "Identificados",
                    "Sem duplicados",
                    "Após título/resumo",
                    "Lidos",
                    "Incluídos na revisão"
                ]

            },
        }
       
    });
    return (
        <Chart options={funnelConfing.options}
        series={funnelConfing.series}
        type="bar"
        height={500}
        width={800}/>
    );
}