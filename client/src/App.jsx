import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import ApprovalList from "./pages/ApprovalList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getToken } from "./utils/auth";
import { ToastContainer } from "react-toastify";
import AdminList from "./pages/AdminUsers";

const App = () => {
  const isLoggedIn = !!getToken();

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />

        {/* ROOT */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />

        {/* PROTECTED */}
        {isLoggedIn && (
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/approvals" element={<ApprovalList />} />
                  <Route path="/admins" element={<AdminList />} />
                </Routes>
              </Layout>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
