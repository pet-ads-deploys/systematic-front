import { useEffect, useState } from "react";

interface QualityFormData {
  type: string;
  text: string;
  select: string[];
}

const useFetchQualityFormData = (url: string) => {
  const [qualityForm, setQualityForm] = useState<QualityFormData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
          setQualityForm(data);
        } else {
          console.error("O arquivo JSON não possui dados");
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    fetchData();
  }, [url]);

  return qualityForm;
};

export default useFetchQualityFormData;
