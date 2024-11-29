import { SetStateAction, useState } from "react";
import axios from "../../interceptor/interceptor";
import useGetSession from "./useGetSession";
import { useToast } from "@chakra-ui/react";

interface Props {
    setSessions: React.Dispatch<SetStateAction<{id: string, systematicStudyd: string, userId: string, 
        searchString: string, additionalInfo: string, timestamp: string, 
        source: string, numberOfRelatedStudies: number }[]>>
    type: string;
}

const useHandleExportedFiles = ({setSessions, type}: Props) => {
    const [showInput, setShowInput] = useState(false);
    const [ referenceFiles, setReferenceFiles ] = useState<File[]>([]);
    const [source, setSource] = useState('');
    const toast = useToast();

    function handleFile(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }

        console.log(target.files);
        setReferenceFiles( () => [...referenceFiles, target.files[0]] );
        setShowInput(false);
    }

    async function sendFilesToServer() {
        const formData = new FormData();
        const data = JSON.stringify({
            source: source,
            searchString: "Machine Learning",
            additionalInfo: "Referências para revisão",
        });
        const token = localStorage.getItem("accessToken");
        const options = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const id = localStorage.getItem("systematicReviewId");
        const url = `http://localhost:8080/api/v1/systematic-study/${id}/search-session`;
        formData.append("file", referenceFiles[referenceFiles.length - 1]);
        formData.append("data", data);

        try {
            const response = await axios.post(url, formData, options);
            const rejectedArticles: string[] = response.data.invalidEntries;

            if (rejectedArticles.length > 0) {
                toast({
                    title: "Artigos rejeitados",
                    description: `${rejectedArticles.length} artigos foram rejeitados durante a importação.`,
                    position: "top",
                    status: "warning",
                    duration: 4500,
                    isClosable: true,
                });
            }

            const searchSessions = await useGetSession(type);
            setSessions(searchSessions.data.searchSessions);
        } catch (err) {
            console.error(err);
            toast({
                title: "Erro",
                position: "top",
                description: "Ocorreu um erro ao enviar os arquivos. Por favor, tente novamente.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

  
    return { handleFile, showInput, setShowInput, referenceFiles, setReferenceFiles, sendFilesToServer, setSource }
}

export default useHandleExportedFiles;