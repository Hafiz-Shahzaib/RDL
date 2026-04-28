import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function ExploreCourses() {

  const navigate = useNavigate()

  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>
      {/* for left or top */}
      <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>
        <span className='text-[35px] font-semibold'>Explore Our Courses</span>
        <p className='text-[17px]'>These are our courses that will be provided on this platform for IT Students affiliated with Punjab University Lahore. </p>
        <button className='px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer' onClick={()=> navigate("/allcourses")}>Explore Courses <SiViaplay className='w-[30px] h-[30px] fill-white'/> </button>
      </div>

      {/* right or bottom */}

      <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>
        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
          <div></div>
        </div>
      </div>

    </div>
  )
}

export default ExploreCourses
