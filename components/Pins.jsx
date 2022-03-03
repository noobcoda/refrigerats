import React, { useState } from 'react';
import { Navbar, Feed, Search } from ".";

export default function Pins({user}) {
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user}/>
            </div>
            <div className="h-full">
                <Search searchTerm={searchTerm}/>
            </div>
        </div>
    )
}
