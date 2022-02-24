import React from 'react';
import { useRouter } from "next/router";
import { Navbar } from "../../components";
import {HiStar} from "react-icons/hi"

const Post = () => {
    const router = useRouter();
    const {pid} = router.query;

    return (
        <div className="px-2 md:px-5">
            <Navbar />
            <div className="flex">
                <div> 
                    {/* for the review, letting user review */}
                    <div className="text-center text-4xl sm:text-3xl md:text-left flex gap-2 md:gap-2 w-full">
                        <HiStar className="fill-lime-400"/>
                        <h1 className="font-semibold ">2 reviews</h1>
                    </div>
                </div>
                <div>
                    {/* for all other reviews */}

                </div>
            </div>

        </div>
    );
}

export default Post;