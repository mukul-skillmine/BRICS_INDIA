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
import RegistrationPage from "./pages/RegistrationPage";
import BricsLogin from "./pages/BricsLogin";
import CreateEventModal from './pages/CreateEvent/CreateEventModal';
import { useState } from "react";


const App = () => {
  const isLoggedIn = !!getToken();

    const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <BrowserRouter>
    <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mt-12"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Event
        </button>

        <CreateEventModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      <ToastContainer />

      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />
        <Route path="/brics-login" element={<BricsLogin/>} />

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
                   <Route path="/registration" element={<RegistrationPage />}/>
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
