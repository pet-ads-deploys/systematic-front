import { useEffect, useState } from "react";

interface collabsCardProps {
    name: string;
    photo: string;
    github: string;
    filiacao: string
}

const useFecthCollaboratorsInfo = (url: string) => {
    const [collabInfos, SetCollabInfos] = useState<collabsCardProps[] | []>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data) {
                    SetCollabInfos(data);
                } else {
                    console.error("O arquivo JSON não possui dados");
                }
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        };

        fetchData();
    }, [url]);

    return { collabInfos }
};

export default useFecthCollaboratorsInfo;