import React, { useState } from 'react'
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App"
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";

function Nav() {

    const {userData} = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showHam, setShowHam] = useState(false);

    // for Dashboard
    const handleDashboardNavigation = () => {
      if(userData?.role === "student"){
        navigate("/student")
      }else if (userData?.role === "teacher") {
        navigate("/teacher")
      }else if(userData?.role === "admin"){
        navigate("/admin")
      }else{
        navigate("/")
      }
    };


    // for logout
    const handleLogOut = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials: true})
        dispatch(setUserData(null))
        console.log(result.data)
        toast.success("LogOut Successfully")
      } catch (error) {

        console.log(error)
        toast.error(error.response.data.message)
        
      }
    }
    

  return (
    <div>
      <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'>
        <div className='lg:w-[20%] w-[40%] lg:pl-[50px] flex items-center gap-3'>
          <img src={logo} alt="" className='w-[60px] rounded-[5px] border-2 border-white'/>
           {/* <img src={favicon} alt="" className='w-[60px] rounded-[5px] object-cover shrink-0'/>
            <p className='text-blue-500 font-bold leading-tight m-0 text-[25px]'>Revolutionizing <br /> Digital Learning</p> */}
        </div>

        <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>

          {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer' onClick={()=>setShow(prev=>!prev)}/>}
            {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={()=>setShow(prev=>!prev)} />:
            <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={()=>setShow(prev=>!prev)}>
              {userData?.name.slice(0,1).toUpperCase()}
            </div>}

            {/* for Dashboard */}

        </div>
      </div>
      
    </div>
  )
}

export default Nav
