import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './../component/Nav';
import home from "../assets/home1.jpg"

function Home() {

  const navigate = useNavigate()

  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh]relative'>
        <Nav />
        <img src={home} alt="" className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]' />
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Grow your Skills to advance</span>
        <span className='lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold'>Your Career Path</span>
        <div></div>
      </div>
    </div>
  )
}

export default Home
