// External library
import { RouteObject, useRoutes } from "react-router-dom";

// Guard Component
import ProtectedRoute from "@features/auth/guards/ProtectedRoute";

// Pages Components

// Home
import Homepage from "@features/landing/pages/Homepage";
import CollaboratorsPage from "@features/landing/pages/Collaborators";

// User
import UserArea from "@features/user/pages/UserArea";

// Planning
import NovaRevisao from "@features/review/planning-protocol/pages/NewReview";
import Protocol from "@features/review/planning-protocol/pages/StepOne";
import ProtocolPartThree from "@features/review/planning-protocol/pages/StepThree";
import ProtocolPartTwo from "@features/review/planning-protocol/pages/StepTwo";

// Execution
import Identification from "@features/review/execution-identification/pages/Identification";
import IdentificationSession from "@features/review/execution-identification/pages/IdentificationSession";
import Selection from "@features/review/execution-selection/pages/Selection";
import Extraction from "@features/review/execution-extraction/pages/Extraction";

// Summarization
import Graphics from "@features/review/summarization-graphics/pages/Graphics";
import Visualization from "@features/review/summarization-visualization/pages/visualization";
import Finalization from "@features/review/summarization-finalization/pages/Finalization";

// Error Information
import Unauthorized from "@features/application/pages/UnauthorizedPage";
import ServerError from "@features/application/pages/ServerErrorPage";

const routesList: RouteObject[] = [
  {
    path: "/",
    element: <Homepage />,
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
    path: "/newReview/selection",
    element: <ProtectedRoute element={<Selection />} />,
  },
  {
    path: "/newReview/extraction",
    element: <ProtectedRoute element={<Extraction />} />,
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
];

export default function AppRoutes() {
  const elementRoutes = useRoutes(routesList);
  return elementRoutes;
}
