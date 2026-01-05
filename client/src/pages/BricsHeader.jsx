import React from 'react'
import logo1 from '../assets/images/logo1.svg'
import national from '../assets/images/national-emblem.svg'
import open_in_new from '../assets/images/open_in_new.svg'
import { useNavigate } from 'react-router-dom'
import { Target } from 'lucide-react'

const BricsHeader = () => {

    const navigate = useNavigate();

  return (
    <div className='w-full h-[80px] mx-auto flex items-center justify-center  px-2 sm:px-0'>
    <div className="mx-auto w-full max-w-[1400px] flex items-center justify-between px-8 py-4 bg-white rounded-full shadow-md inset-x-0">

        <div className='flex gap-3 items-center'>
            <img src={national} alt="" className=' w-[18px] h-[34px] md:w-[24px] md:h-[41px]'/>
            <div className='w-[2px]  bg-[#7F7F7F]  h-[41px]'></div>
            <img src={logo1} alt="" className='w-[46px] h-[38px] md:w-[78px] md:h-[57px]'/>
        </div>
        <div className='flex items-center gap-1 sm:gap-2 cursor-pointer' target="_blank"
        onClick={()=>navigate('https://devbrics.negd.in/') }
        >
            <p className='text-[#1F4788] text-sm sm:text-xl '>Go to main website</p>
            <img src={open_in_new} alt="open_web_site"  />
        </div>

    </div>
    </div>
  )
}

export default BricsHeader