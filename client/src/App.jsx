import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './features/counterSlice.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import Navbar from './components/Navbar.jsx';


const App = () => {
   const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <BrowserRouter>
      <div className='w-full container'>
        <Navbar/>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/create-event" element={<CreateEvent />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>   
  )
}

export default App
