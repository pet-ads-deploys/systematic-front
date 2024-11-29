import { SetStateAction } from "react";

export default interface IAcordionDashboard {
    type: string;
    sessions: {
        id: string, 
        systematicStudyd: string, 
        userId: string,    
        searchString: string, 
        additionalInfo: string, 
        timestamp: string, 
        source: string, 
        numberOfRelatedStudies: number
    }[];
    setSessions: React.Dispatch<SetStateAction<{id: string, 
        systematicStudyd: string, 
        userId: string,    
        searchString: string, 
        additionalInfo: string, 
        timestamp: string, 
        source: string, 
        numberOfRelatedStudies: number}[]>>
}