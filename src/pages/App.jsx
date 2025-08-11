import { Routes, Route } from "react-router-dom";
import Navbar from "../components/NavBar";
import Home from "./Home.jsx";
import Precheckout from "./Prechekout.jsx";
import AdminLogin from "./Adminlogin.jsx";
import AdminDashboard from "./Admin.jsx";
import PrivateRoute from "../components/PrivateRouter.jsx";

function App() {
  return (
    <div className="m-w-[100vw] w-[100%] relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prechekout" element={<Precheckout />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
