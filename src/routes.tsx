// External library
import { RouteObject, useRoutes } from "react-router-dom";

// Guard Component
import ProtectedRoute from "@features/auth/guards/ProtectedRoute";

// Pages Components
import CollaboratorsPage from "./pages/CollaboratorsPage/CollaboratorsPage";
import Extraction from "./pages/Execution/Extraction/Extraction";
import Finalization from "./pages/NovaRevisao/finalization/Finalization";
import Graphics from "./pages/NovaRevisao/graphics/Graphics";
import Homepage from "./pages/Homepage/Homepage";
import Identification from "./pages/Execution/Identification/Identification";
import IdentificationSession from "./pages/Execution/Identification/IdentificationSession";
import Insertion from "./legacy/pages/execution/Insertion/Insertion";
import KeyWordScreen from "./legacy/pages/execution/KeyWordScreen/KeyWordScreen";
import LandingPage from "./pages/LandingPage/LandingPage";
import NovaRevisao from "./pages/NovaRevisao/novaRevisao";
import Protocol from "./pages/Protocolo/Protocol";
import ProtocolPartThree from "./pages/Protocolo/ProtocolPartThree";
import ProtocolPartTwo from "./pages/Protocolo/Protocol-Part-Two";
import SearchSession from "./legacy/pages/execution/SearchSession/SearchSession";
import Selection from "./pages/Execution/Selection/Selection";
import ServerError from "./pages/ServerErrorPage/ServerErrorPage";
import Unauthorized from "./pages/UnauthorizedPage/UnauthorizedPage";
import UserArea from "./pages/UserArea/UserArea";
import Visualization from "./pages/NovaRevisao/visualization/Visualization";

const routesList: RouteObject[] = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/landing",
    element: <ProtectedRoute element={<LandingPage />} />,
  },
  {
    path: "/user",
    element: <ProtectedRoute element={<UserArea />} />,
  },
  {
    path: "/collaborators",
    element: <ProtectedRoute element={<CollaboratorsPage />} />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/serverError",
    element: <ServerError />,
  },
  {
    path: "/newReview",
    element: <ProtectedRoute element={<NovaRevisao />} />,
  },
  {
    path: "/newReview/protocol/:id",
    element: <Protocol />,
  },
  {
    path: "/newReview/protocolpartTwo/:id",
    element: <ProtectedRoute element={<ProtocolPartTwo />} />,
  },
  {
    path: "/newReview/protocolpartThree/:id",
    element: <ProtectedRoute element={<ProtocolPartThree />} />,
  },
  {
    path: "/newReview/identification",
    element: <ProtectedRoute element={<Identification />} />,
  },
  {
    path: "/newReview/identification/:session",
    element: <ProtectedRoute element={<IdentificationSession />} />,
  },
  {
    path: "/newReview/keywords",
    element: <ProtectedRoute element={<KeyWordScreen />} />,
  },
  {
    path: "/newReview/selection",
    element: <ProtectedRoute element={<Selection />} />,
  },
  {
    path: "/newReview/extraction",
    element: <ProtectedRoute element={<Extraction />} />,
  },
  {
    path: "/newReview/insertion",
    element: <ProtectedRoute element={<Insertion />} />,
  },
  {
    path: "/newReview/graphics",
    element: <ProtectedRoute element={<Graphics />} />,
  },
  {
    path: "/newReview/finalization",
    element: <ProtectedRoute element={<Finalization />} />,
  },
  {
    path: "/newReview/visualization",
    element: <ProtectedRoute element={<Visualization />} />,
  },
  {
    path: "/newReview/searchSession",
    element: <ProtectedRoute element={<SearchSession />} />,
  },
];

export default function AppRoutes() {
  const elementRoutes = useRoutes(routesList);
  return elementRoutes;
}
