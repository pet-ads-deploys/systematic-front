import { useEffect, useState } from "react";

interface ReferenceData {
  authors: string;
  year: string;
  fullReference: string;
}

const useFetchReferenceData = (url: string): ReferenceData[] => {
  const [reference, setReference] = useState<ReferenceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = (await response.json()) as ReferenceData[];

        if (data) {
          setReference(data);
        } else {
          console.error("O arquivo JSON não possui dados");
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    fetchData();
  }, [url]);

  return reference;
};

export default useFetchReferenceData;
