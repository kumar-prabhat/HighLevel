import { BrowserRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <>
        <ToastContainer
          autoClose={3000}
          draggable
          pauseOnHover
          position={toast.POSITION.TOP_RIGHT}
          icon={false}
          hideProgressBar
          theme="colored"
        />
        <Navbar />
        <AppRoutes />
      </>
    </Router>
  );
};

export default App;
