import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

import { useEffect, useState } from "react";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface iGraphicsData {
  label: string;
  value: number;
}

const useFetchGraphicsData = (url: string) => {
  const [GraphicsData, setGraphicsData] = useState<iGraphicsData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (Array.isArray(data)) {
          setGraphicsData(data);
        } else {
          console.error("O arquivo JSON não possui uma estrutura de array.");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };
    fetchData();
  }, [url]);
  return GraphicsData;
};
export default useFetchGraphicsData;
