import Link from "next/link";
import React from 'react';
import logo from "../assets/logo.png";
import { MyNav } from "../components";
import { useRouter } from "next/router";

const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

export default function Sidebar({user,closeToggle}){
    const router = useRouter();
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false); //only be able to call this function if closeToggle exists
    }
    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-hidden min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link
                    href="/home"
                    className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                    onClick={handleCloseSidebar}
                >
                <img src={logo} alt="logo" className="w-full"/>
                </Link>
                <div className="flex flex-col gap-5">
                    <MyNav />
                    {/* <h3 className="mt-2 px-5 text-base 2xl:text-xl">
                        Categories 
                    </h3>
                    <ul>
                        {categories.slice(0,categories.length -1 ).map((category) => (
                            <li key={category.name}>
                                <Link href={category.path} passHref onClick={handleCloseSidebar}>
                                    <a className={router.pathname === category.path ? isActiveStyle: isNotActiveStyle}>
                                        {category.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul> */}
                </div>
            </div>
        </div>
    )
}