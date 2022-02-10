import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const breakpointObj = {
    default: 3, //default num of columns
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1, //on mobile devices
}

export default function MyMasonry({pins}){
    return (
        <div>
            <Masonry
                className="flex animate-slide-fwd" breakpointCols={breakpointObj}
            >
                {pins?.map((pin) => <Pin pin={pin}/>)}
            </Masonry>
        </div>
    );
}