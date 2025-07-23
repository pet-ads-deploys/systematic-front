// External library
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

// Contexts
import { AppProvider } from "./features/shared/context/ApplicationContext";
import { StudySelectionProvider } from "./context/StudiesSelectionContext";

// Components
import App from "./App.tsx";

// Styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppProvider>
        <StudySelectionProvider>
          <App />
        </StudySelectionProvider>
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
