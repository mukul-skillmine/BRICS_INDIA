import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { ToastContainer, toast } from 'react-toastify';
import Registrations from "./pages/Registrations";


const App = () => {
  return (
    <div className='w-full'>
      <ToastContainer/>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/registrations" element={<Registrations />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
