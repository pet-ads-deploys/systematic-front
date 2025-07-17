import { useEffect, useState } from "react";

const useFetchSelectionData = (url: string) => {
    const [selectionInclusionData, setSelectionInclusionData] = useState<string[]>([]);
    const [selectionExclusionData, setSelectionExclusionData] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (Array.isArray(data)) {
                    const inclusionCriteria = data
                        .filter(item => item.type === "INCLUSAO")
                        .map(item => item.description);
                    const exclusionCriteria = data
                        .filter(item => item.type === "EXCLUSAO")
                        .map(item => item.description);

                    setSelectionInclusionData(inclusionCriteria);
                    setSelectionExclusionData(exclusionCriteria);
                } else {
                    console.error("O arquivo JSON não possui o formato esperado");
                }
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        };

        fetchData();
    }, [url]);

    return { selectionInclusionData, selectionExclusionData };
};

export default useFetchSelectionData;
