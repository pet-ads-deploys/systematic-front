// External library
import { HashRouter as Router } from "react-router-dom";

// Route Component
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
