import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Registrations from "./pages/Registrations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import { isLoggedIn } from "./utils/auth";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        {/* ROOT REDIRECT */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn() ? "/home" : "/login"} />}
        />

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn() ? <Navigate to="/home" /> : <Signup />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <Events />
            </Layout>
          }
        />
        <Route
          path="/registrations"
          element={
            <Layout>
              <Registrations />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
