// External library
import { RouteObject, useRoutes } from "react-router-dom";

// Guard Component
import ProtectedRoute from "@features/auth/guards/ProtectedRoute";

// Pages Components

// Home
import Homepage from "./pages/Homepage/Homepage";
import LandingPage from "./pages/LandingPage/LandingPage";
import CollaboratorsPage from "./pages/CollaboratorsPage/CollaboratorsPage";

// User
import UserArea from "./pages/UserArea/UserArea";

// Planning
import NovaRevisao from "@features/review/planning-protocol/pages/NewReview";
import Protocol from "@features/review/planning-protocol/pages/StepOne";
import ProtocolPartThree from "@features/review/planning-protocol/pages/StepThree";
import ProtocolPartTwo from "@features/review/planning-protocol/pages/StepTwo";

// Execution
import Insertion from "./legacy/pages/execution/Insertion/Insertion";
import KeyWordScreen from "./legacy/pages/execution/KeyWordScreen/KeyWordScreen";
import Identification from "@features/review/execution-identification/pages/Identification";
import IdentificationSession from "@features/review/execution-identification/pages/IdentificationSession";
import Selection from "@features/review/execution-selection/pages/Selection";
import Extraction from "@features/review/execution-extraction/pages/Extraction";

// Summarization
import Graphics from "@features/review/summarization-graphics/pages/Graphics";
import Visualization from "@features/review/summarization-visualization/pages/visualization";
import Finalization from "@features/review/summarization-finalization/pages/Finalization";

// Error Information
import ServerError from "./pages/ServerErrorPage/ServerErrorPage";
import Unauthorized from "./pages/UnauthorizedPage/UnauthorizedPage";

// Legacy
import SearchSession from "./legacy/pages/execution/SearchSession/SearchSession";

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
