import { Route, HashRouter as Router, Routes } from "react-router-dom";
import AppContext, { AppProvider } from "./context/AppContext";
import { useContext } from "react";

import CollaboratorsPage from "./pages/CollaboratorsPage/CollaboratorsPage";
import Extraction from "./pages/Execution/Extraction/Extraction";
import Finalization from "./pages/NovaRevisao/finalization/Finalization";
import Graphics from "./pages/NovaRevisao/graphics/Graphics";
import Homepage from "./pages/Homepage/Homepage";
import Identification from "./pages/Execution/Identification/Identification";
import IdentificationSession from "./pages/Execution/Identification/IdentificationSession";
import Insertion from "./pages/Execution/Insertion/Insertion";
import KeyWordScreen from "./pages/Execution/KeyWordScreen/KeyWordScreen";
import LandingPage from "./pages/LandingPage/LandingPage";
import NovaRevisao from "./pages/NovaRevisao/novaRevisao";
import Protocol from "./pages/Protocolo/Protocol";
import ProtocolPartThree from "./pages/Protocolo/ProtocolPartThree";
import ProtocolPartTwo from "./pages/Protocolo/Protocol-Part-Two";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SearchSession from "./pages/SearchSession/SearchSession";
import Selection from "./pages/Execution/Selection/Selection";
import ServerError from "./pages/ServerErrorPage/ServerErrorPage";
import TestPage from "./pages/TestPage/TestPage";
import Unauthorized from "./pages/UnauthorizedPage/UnauthorizedPage";
import UserArea from "./pages/UserArea/UserArea";
import Visualization from "./pages/NovaRevisao/visualization/Visualization";
import { StudySelectionProvider } from "./context/StudiesSelectionContext";

function App() {
  const context = useContext(AppContext);

  if (!context) {
    return (
      <Router>
        <AppProvider>
          <StudySelectionProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/landing"
                element={<ProtectedRoute element={<LandingPage />} />}
              />
              <Route
                path="/test"
                element={<ProtectedRoute element={<TestPage />} />}
              />
              <Route
                path="/user"
                element={<ProtectedRoute element={<UserArea />} />}
              />
              <Route
                path="/collaborators"
                element={<ProtectedRoute element={<CollaboratorsPage />} />}
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/serverError" element={<ServerError />} />

              <Route
                path="/newReview"
                element={<ProtectedRoute element={<NovaRevisao />} />}
              />
              <Route
                path="/newReview/protocol/:id"
                element={<ProtectedRoute element={<Protocol />} />}
              />
              <Route
                path="/newReview/protocolpartTwo/:id"
                element={<ProtectedRoute element={<ProtocolPartTwo />} />}
              />
              <Route
                path="/newReview/protocolpartThree/:id"
                element={<ProtectedRoute element={<ProtocolPartThree />} />}
              />
              <Route
                path="/newReview/identification"
                element={<ProtectedRoute element={<Identification />} />}
              />
              <Route
                path="/newReview/identification/:session"
                element={<IdentificationSession />}
              />
              <Route
                path="/newReview/keywords"
                element={<ProtectedRoute element={<KeyWordScreen />} />}
              />
              <Route
                path="/newReview/selection"
                element={<ProtectedRoute element={<Selection />} />}
              />
              <Route
                path="/newReview/extraction"
                element={<ProtectedRoute element={<Extraction />} />}
              />
              <Route
                path="/newReview/insertion"
                element={<ProtectedRoute element={<Insertion />} />}
              />
              <Route
                path="/newReview/graphics"
                element={<ProtectedRoute element={<Graphics />} />}
              />
              <Route
                path="/newReview/finalization"
                element={<ProtectedRoute element={<Finalization />} />}
              />
              <Route
                path="/newReview/visualization"
                element={<ProtectedRoute element={<Visualization />} />}
              />
              <Route
                path="/newReview/searchSession"
                element={<ProtectedRoute element={<SearchSession />} />}
              />
            </Routes>
          </StudySelectionProvider>
        </AppProvider>
      </Router>
    );
  }

  const button = context;
  console.log("App -> button: " + button);

  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<UserArea />} />
          <Route
            path="/landing"
            element={<ProtectedRoute element={<LandingPage />} />}
          />
          <Route
            path="/test"
            element={<ProtectedRoute element={<TestPage />} />}
          />
          <Route path="/homepage" element={<Homepage />} />
          <Route
            path="/collaborators"
            element={<ProtectedRoute element={<CollaboratorsPage />} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={<UserArea />} />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/serverError" element={<ServerError />} />

          <Route
            path="/newReview"
            element={<ProtectedRoute element={<NovaRevisao />} />}
          />
          <Route
            path="/newReview/protocol"
            element={<ProtectedRoute element={<Protocol />} />}
          />
          <Route
            path="/newReview/protocolpartTwo"
            element={<ProtectedRoute element={<ProtocolPartTwo />} />}
          />
          <Route
            path="/newReview/identification"
            element={<ProtectedRoute element={<Identification />} />}
          />
          <Route
            path="/newReview/keywords"
            element={<ProtectedRoute element={<KeyWordScreen />} />}
          />
          <Route
            path="/newReview/selection"
            element={<ProtectedRoute element={<Selection />} />}
          />
          <Route
            path="/newReview/extraction"
            element={<ProtectedRoute element={<Extraction />} />}
          />
          <Route
            path="/newReview/insertion"
            element={<ProtectedRoute element={<Insertion />} />}
          />
          <Route
            path="/newReview/graphics"
            element={<ProtectedRoute element={<Graphics />} />}
          />
          <Route
            path="/newReview/finalization"
            element={<ProtectedRoute element={<Finalization />} />}
          />
          <Route
            path="/newReview/searchSession"
            element={<ProtectedRoute element={<SearchSession />} />}
          />
          {/* <Route path="/newReview/protocolpartThree" element={<ProtocolPartThree />} /> */}
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
