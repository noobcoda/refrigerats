import React from 'react';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import Link from 'next/link';
import {createpinState} from "../atoms/createpinAtom";
import {useRecoilState} from "recoil";

export default function Navbar({searchTerm, setSearchTerm, user}) {
  const [open,setOpen] = useRecoilState(createpinState);
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
          </div>
      </div>
  )
}
