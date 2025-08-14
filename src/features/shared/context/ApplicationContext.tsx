// External library
import { createContext, ReactNode, useState } from "react";

// Types
import type { StudyInterface } from "../../review/shared/types/IStudy";

interface AppContextType {
  button: string;
  setButton: React.Dispatch<React.SetStateAction<string>>;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  renderForm: string;
  setRenderForm: React.Dispatch<React.SetStateAction<string>>;
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
  showExtractionModal: boolean;
  setShowExtractionModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectionStudies: StudyInterface[] | undefined;
  setSelectionStudies: React.Dispatch<
    React.SetStateAction<StudyInterface[] | undefined>
  >;
  selectionStudyIndex: number | undefined;
  setSelectionStudyIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  sidebarState: "open" | "collapsed" | "semi-collapsed";
  setSidebarState: React.Dispatch<
    React.SetStateAction<"open" | "collapsed" | "semi-collapsed">
  >;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [button, setButton] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [renderForm, setRenderForm] = useState<string>("Login");
  const [showExtractionModal, setShowExtractionModal] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("");
  const [selectionStudies, setSelectionStudies] = useState<StudyInterface[]>();
  const [selectionStudyIndex, setSelectionStudyIndex] = useState<
    number | undefined
  >();
  const [sidebarState, setSidebarState] = useState<
    "open" | "collapsed" | "semi-collapsed"
  >("open");

  return (
    <AppContext.Provider
      value={{
        button,
        setButton,
        item,
        setItem,
        renderForm,
        setRenderForm,
        showExtractionModal,
        setShowExtractionModal,
        activeButton,
        setActiveButton,
        selectionStudies,
        setSelectionStudies,
        selectionStudyIndex,
        setSelectionStudyIndex,
        sidebarState,
        setSidebarState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
