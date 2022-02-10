import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowForward } from "react-icons/io";

const navLinks = [
    { title: "Home", path: "/home"},
    { title: "Profile", path: "/user-profile"},
    { title: "Basket", path: "/user-profile/basket"},
]

const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";


export default function MyNav() {
    const router = useRouter();
    return (
        <ul>
            {navLinks.map((link) => (
                <li key={link.title}>
                    <Link href={link.path} passHref>
                        <a className={router.pathname === link.path ? isActiveStyle: isNotActiveStyle}>
                            {link.title}
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
