import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Feed, CreatePin, Search } from "../components";

export default function Pins({user}) {
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
            </div>
            <div className="h-full">
                <Feed />
            </div>
        </div>
    )
}
