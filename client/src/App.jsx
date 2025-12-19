import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";

const App = () => {
  return (
    <div className='w-full container mx-auto'>

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
