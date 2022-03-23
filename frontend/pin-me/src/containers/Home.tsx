import React, { useState, useRef, useEffect} from 'react'
import { HiMenu } from "react-icons/hi"
import { AiFillCloseCircle } from "react-icons/ai"
import { Link, Route, Routes } from "react-router-dom"

import { userQuery } from "../utils/data"
import { Sidebar, UserProfile } from "../components"
import { client } from "../client"
import logo from "../assets/pin_2.png"
import Pins from "./Pins"

const  Home = () => {
  const [toggleSidebar, settoggleSidebar] = useState<boolean>(false);
  const [user, setUser] = useState<any>([]);
  const scrollRef = useRef(document.createElement("div"));
  
  //Get the user data stored in the localStorage
  const userInfo = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user") || "{}"): localStorage.clear();

  //Fetch the user ID and set it to user variable
  useEffect(() => {
    const query = userQuery(userInfo?.googleId); 
    client.fetch(query)
      .then((data) => { 
        setUser(data[0])
      })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])
  
  return (
    <div className = "flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className = "hidden md:flex h-screen flex-initial"> 
        <Sidebar user={user && user}/>
      </div> 
      <div className = "flex md:hidden flex-row">
        <div className="p-2 flex fle-row justify-between item-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => settoggleSidebar(true)}/>
          <Link to="/">
            <img src={logo} alt="logo" className="w-10" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-10" />
          </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
           <div className="absolute w-full flex justify-end items-center p-2">
             <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => settoggleSidebar(false)}/>
           </div>
           <Sidebar user={user && user} closeToogle={settoggleSidebar}/>
        </div>
      )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path ="/user-profile/:userId" element={<UserProfile/>}/>
          <Route path ="/*" element={<Pins user={user && user}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default  Home