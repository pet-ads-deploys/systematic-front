import { useEffect, useState } from "react";

interface extractionForm {
  label: string;
  selector: string[];
  checkboxes: string[];
}

const useFetchExtractionForm = (url: string) => {
  const [extractionForm, setExtractionForm] = useState<extractionForm | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.label && data.selector && data.checkboxes) {
          setExtractionForm(data);
        } else {
          console.error("O arquivo JSON não possui a estrutura esperada.");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };
    fetchData();
  }, [url]);
  return extractionForm;
};
export default useFetchExtractionForm;
