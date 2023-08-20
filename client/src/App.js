import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <AppRoutes />
      </>
    </Router>
  );
};

export default App;
