import React, { ReactNode, createContext, useState } from "react";
import { StudyInterface } from "../../../public/interfaces/IStudy";
import showFirstPossibleStudy from "../../hooks/seachAppropriateStudy/showFirstPossibleStudy";
import { ExcutionFaseEnum } from "../../../public/enums/ExcutionFaseEnum";

interface AppContextType {
  button: string;
  setButton: React.Dispatch<React.SetStateAction<string>>;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  renderForm: string;
  setRenderForm: React.Dispatch<React.SetStateAction<string>>;
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
  selectionStudy: StudyInterface | undefined;
  setSelectionStudy: React.Dispatch<React.SetStateAction<StudyInterface | undefined>>;
  extractionStudy: StudyInterface | undefined;
  setExtractionStudy: React.Dispatch<React.SetStateAction<StudyInterface | undefined>>;
  showSelectionModal: boolean;
  setShowSelectionModal: React.Dispatch<React.SetStateAction<boolean>>
  showExtractionModal: boolean;
  setShowExtractionModal: React.Dispatch<React.SetStateAction<boolean>>
  selectionStudies: StudyInterface[] | undefined;
  setSelectionStudies: React.Dispatch<React.SetStateAction<StudyInterface[] | undefined>>;
  selectionStudyIndex: number | undefined;
  setSelectionStudyIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  sortedExtractionStudyIndex: number | undefined;
  setSortedExtractionStudyIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  sidebarState: 'open' | 'collapsed' | 'semi-collapsed';
  setSidebarState: React.Dispatch<React.SetStateAction<'open' | 'collapsed' | 'semi-collapsed'>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [button, setButton] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [renderForm, setRenderForm] = useState<string>("Login");
  const [selectionStudy, setSelectionStudy] = useState<StudyInterface | undefined>(
    showFirstPossibleStudy(ExcutionFaseEnum.SELECTION)
  );
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [showExtractionModal, setShowExtractionModal] = useState(false);
  const [extractionStudy, setExtractionStudy] = useState<StudyInterface | undefined>(
    showFirstPossibleStudy(ExcutionFaseEnum.EXTRACTION)
  );
  const [activeButton, setActiveButton] = useState<string>("");
  const [selectionStudies, setSelectionStudies] = useState<StudyInterface[]>();
  const [selectionStudyIndex, setSelectionStudyIndex] = useState<number | undefined>();
  const [sortedExtractionStudyIndex, setSortedExtractionStudyIndex] = useState<number | undefined>();
  const [sidebarState, setSidebarState] = useState<'open' | 'collapsed' | 'semi-collapsed'>('open');



  return (
    <AppContext.Provider
      value={{
        button,
        setButton,
        item,
        setItem,
        renderForm,
        setRenderForm,
        selectionStudy,
        setSelectionStudy,
        extractionStudy,
        showSelectionModal,
        setShowSelectionModal,
        setExtractionStudy,
        showExtractionModal,
        setShowExtractionModal,
        activeButton,
        setActiveButton,
        selectionStudies,
        setSelectionStudies,
        selectionStudyIndex,
        setSelectionStudyIndex,
        sortedExtractionStudyIndex,
        setSortedExtractionStudyIndex,
        sidebarState,
        setSidebarState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
