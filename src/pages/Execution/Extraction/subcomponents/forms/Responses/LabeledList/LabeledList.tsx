import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { scales } from "chart.js";
import { container, label } from "../styles";
import { capitalize } from "../../../../../../../utils/CapitalizeText";

interface LabeledListProps {
    question: string;
    scales: Record<string, number>;
}

export default function LabeledList({question, scales}: LabeledListProps){
    
    return(
        <FormControl sx={container}>
            <FormLabel sx={label}>{capitalize(question)}</FormLabel>
            
        </FormControl>
    )
}