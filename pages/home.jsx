import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import Link from "next/link";
import {Sidebar, UserProfile, Pins, CreatePin} from "../components";
import logo from "../assets/logo.png";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();
    console.log(session);
    const [toggleSidebar,setToggleSidebar] = useState(false);


    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={session?.user && session?.user}/>
            </div>
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu font size={40} className="cursor-pointer" onClick={()=>setToggleSidebar(true)}/>
                    <Link href="/">
                        <img src={logo} alt="logo" className="w-28"/>
                    </Link>
                    <Link href={`user-profile/${session?.user?.uid}`}>
                        <img src={session?.user?.image} alt="profile" className="w-11 h-11 rounded-full"/>
                    </Link>
                </div>
                {toggleSidebar && (
                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=>setToggleSidebar(false)}/>
                        </div>
                        <Sidebar user={session?.user && session?.user} closeToggle={setToggleSidebar}/>
                    </div>
                )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll">
                <Pins user={session?.user && session?.user}/>
                <CreatePin />
            </div>

        </div>
    )
}