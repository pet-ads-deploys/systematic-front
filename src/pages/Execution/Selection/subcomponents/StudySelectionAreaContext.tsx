import React, { ReactNode, createContext , useState } from 'react';

interface StudySelectionAreaContextType {
    study: (string|number)[];
    setStudy: React.Dispatch<React.SetStateAction<(string|number)[]>>;
}

const StudySelectionAreaContext = createContext<StudySelectionAreaContextType | undefined >(undefined);

interface StudySelectionAreaProviderProps {
    children: ReactNode;
}

export const StudySelectionAreaProvider: React.FC<StudySelectionAreaProviderProps> = ({ children }) => {
    const [study, setStudy] = useState<(string|number)[]>([]);

    return (
        <StudySelectionAreaContext.Provider value={{ study, setStudy}}>
            {children}
        </StudySelectionAreaContext.Provider>
    );
};

export default StudySelectionAreaContext;