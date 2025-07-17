import { useEffect, useState } from "react";

/*interface ISelectionData {
    inclusionCriteria: string[];
    exclusionCriteria: string[];
}*/

const useFecthSelectionData = (url: string) => {
    const [selectionInclusionData, setSelectionInclusionData] = useState([]);
    const [selectionExclusionData, setSelectionExclusionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data && data.inclusionCriteria && data.exclusionCriteria) {
                    setSelectionExclusionData(data.exclusionCriteria);
                    setSelectionInclusionData(data.inclusionCriteria);
                } else {
                    console.error("O arquivo JSON não possui dados");
                }
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        };

        fetchData();
    }, [url]);

    return { selectionInclusionData, selectionExclusionData };
};

export default useFecthSelectionData;