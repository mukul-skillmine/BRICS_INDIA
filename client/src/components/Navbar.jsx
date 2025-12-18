import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateEvent from '../pages/CreateEvent';

const Navbar = () => {
    const navigate = useNavigate();

    const[showModal,setShowModal] = useState(false);

  return (
    <div>
    <div className='flex  justify-end mt-8'>
      <button className='bg-orange-400 px-4 py-1 rounded-md text-white hover:bg-orange-600 transition-all duration-200 ease-in-out'
      onClick={()=>setShowModal(prev => !prev)}
      >Create Event</button>

    </div>
    {
        showModal && <CreateEvent setShowModal={setShowModal}/>
    }
    </div>
  )
}

export default Navbar
