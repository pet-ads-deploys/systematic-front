import React, { ReactNode, createContext , useState } from 'react';

interface ModalContextType {
    PanelState: string;
    setPanelState: React.Dispatch<React.SetStateAction<string>>;
    StudyDataButtonState: boolean;
    setStudyDataButtonState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType | undefined >(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [PanelState, setPanelState] = useState<string>("Selection Data");
    const [StudyDataButtonState, setStudyDataButtonState] = useState<boolean>(true);

    return (
        <ModalContext.Provider value={{ PanelState, setPanelState, StudyDataButtonState, setStudyDataButtonState}}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext;