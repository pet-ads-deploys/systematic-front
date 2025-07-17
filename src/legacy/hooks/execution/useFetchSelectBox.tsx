import { useEffect, useState } from "react";

interface Select {
  code: string;
  description: string;
  options: string[];
}

const useFetchSelectBox = (url: string) => {
  const [selections, setSelections] = useState<Select[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data: Select[] = await response.json();
        if (Array.isArray(data) && data.every(item => item.code && item.description && item.options)) {
          setSelections(data);
        } else {
          console.error("O arquivo JSON não possui a estrutura esperada.");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };
    fetchData();
  }, [url]);
  return selections;
};
export default useFetchSelectBox;