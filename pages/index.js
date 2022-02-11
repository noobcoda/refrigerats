import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import team from "../assets/team.svg";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function Main() {
  const {data:session} = useSession();
  console.log(session);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img src={team} alt="" className="w-full h-full object-cover"/>

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="Strokeicon"/>
          </div>
          <div className="shadow-2xl">
            <button
                type="button"
                className="bg-mainColor pointer-cursor p-3 flex justify-center items-center rounded-lg outline-none"
                onClick={signIn}
              >
                <p className="mr-4">Get started!</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
