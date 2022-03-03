import React from 'react';
import { IoMdAdd, IoMdSearch, IoIosNotificationsOutline } from 'react-icons/io';
import Link from 'next/link';
import {createpinState} from "../atoms/createpinAtom";
import {useRecoilState} from "recoil";
import { getMessaging, getToken } from "firebase/messaging";

export default function Navbar({searchTerm, setSearchTerm, user}) {
  const [open,setOpen] = useRecoilState(createpinState);
  


  function subscribeUser(){
    Notification.requestPermission().then(permission=>{
      console.log(permission)
      if (permission=="granted"){
        const messaging = getMessaging();
        getToken(messaging,
          {vapidKey:"BKBBCZaOd3JigBb08V5M2WyKZ6zR5FE1EjuF-l2vb29kWdm1erLmTbdJ5m3YleuuztpXAhQ52A00ujuGEao9hyE"}
        ).then(currentToken=>{
          if (currentToken){
            console.log(currentToken);
          } else {
            console.log("No registration token available. Request permission to generate one.");
          }
        }).catch((err) => {
          console.log("An error occured while retrieving token.",err);
        })
      }
    })
  }
  
  return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
          <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
              <IoMdSearch fontSize={21} className="ml-1"/>
              <input 
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                value={searchTerm}
                className="p-2 w-full bg-white outline-none"
              />
          </div>
          <div className="flex gap-3 items-center">
            <IoMdAdd onClick={() => setOpen(true)} className="flex items-center justify-end bg-black text-white rounded-lg w-6 h-6"/>
            {/* <IoIosNotificationsOutline onClick={subscribeUser} className="flex items-center justify-end w-6 h-6"/> */}
          </div>
      </div>
  )
}
