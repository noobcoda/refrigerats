import { useEffect, useState } from 'react';
import Link from 'next/link';
import {v4 as uuidv4} from "uuid";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { BsBasketFill, BsBasket } from 'react-icons/bs';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { doc, deleteDoc, collection, setDoc, onSnapshot, query } from "firebase/firestore";
import {db } from "../firebase";

export default function Pin({pin}) {
    const { data: session } = useSession();
    const [postHovered, setPostHovered] = useState(false);
    const [saves,setSaves] = useState([]);
    const [hasSaved,setHasSaved] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        router.push("/pindetail/[id]");
    }

    useEffect(
        () => 
            onSnapshot(
                query(
                    collection(db,'posts',pin.id,'save'),
                ),
                (snapshot) => setSaves(snapshot.docs)
            ),
        [db,pin.id],
    );

    useEffect(
        () => 
            setHasSaved(
                saves.findIndex((save) => (save.id === session?.user?.uid)) !== -1
            ),
        [saves]
    );

    const savePin = async () => {
        if (hasSaved) {
            await deleteDoc(doc(db,"posts",pin.id,'save',session.user.uid));
        } else {
            //update firebase
            await setDoc(doc(db,'posts',pin.id,'save',session.user.uid),{
                name: session.user.name,
            })

            //also send notification to seller
            
        }
    }

    const deletePin = async() => {
        //delete using firebase
        await deleteDoc(doc(db,'posts',pin.id));
    }
    
    return (
        <div className="m-2 border-2 border-gray-200">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={handleClick}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                <img src={pin.data().image} className="rounded-lg w-full" alt=""/>
                {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" style={{ height: "100%"}}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <p className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none">
                                    {pin.data().portion - saves.length} left!
                                </p>
                            </div>
                            {(pin.data().portion - saves.length > 0)? 
                            <div>
                            {hasSaved? (
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    savePin();
                                }} type="button" className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
                                    <BsBasketFill />
                                </button>
                            ) : (
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    savePin();
                                }} type="button" className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
                                    <BsBasket />
                                </button>
                            )}
                            </div> : <div></div>}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                            {pin.data().postedBy === session?.user.uid && (
                                <button type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePin();
                                    }}
                                    className="bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                                >
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link href={`userprofile/[${pin.data().postedBy}]`} className="flex-gap-2 mt-2 items-center">
                <div className="flex flex-col items-center">
                    <div className="flex gap-3 mt-3 items-center justify-between">
                        <img 
                            className="w-8 h-8 rounded-full object-cover"
                            src={pin?.data().profileImg}
                            alt="userProfile"
                        />
                        <p className="font-semibold capitalize">
                        {pin?.data().username}
                        </p>
                    </div>                
                    <p>
                        {pin?.data().deliveryLoc}
                    </p>
                    <p>
                        {pin?.data().deliveryTime}
                    </p>
                    <p>
                        {pin?.data().price}
                    </p>
                </div>
            </Link>
        </div>
    );
}
