import React from 'react';
import { useRouter } from "next/router";
import { Navbar } from "../../components";
import { FaStar } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { doc, deleteDoc, collection, setDoc, onSnapshot, query, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
import { ReviewBox } from '../../components';

const Post = () => {
    const { data: session } = useSession();
    console.log(session);
    const router = useRouter();
    const {pid} = router.query;
    console.log(pid);
    const [pin,setPin] = useState(null);
    const [foodRating,setFoodRating] = useState(null);
    const [serviceRating, setServiceRating] = useState(null);
    const commentRef = useRef(null);
    const [review,setReview] = useState([]);
    const [overallRating,setOverallRating] = useState(null);
    const [saves,setSaves] = useState([]);

    useEffect(() => {
        async function fetchPin() {
            const pinRef = collection(db,"posts");
            const docSnap = await getDoc(doc(pinRef,pid));
            setPin(docSnap);
        }
        fetchPin()
    },[]
    );

    useEffect(
        () => 
            onSnapshot(
                query(
                    collection(db,'posts',pid,'save'),
                ),
                (snapshot) => setSaves(snapshot.docs)
            ),
        [saves],
    );

    useEffect(
        () => 
            onSnapshot(
                query(
                    collection(db,'posts',pid,'review'),
                ),
                (snapshot) => setReview(snapshot.docs)
            ),
        [review],
    );

    useEffect(
        () => {
            async function calcOverallRating() {
                const overallTotal = 0;
                for (let i=0;i<review.length;i++){
                    let averageOfOne = 0;
                    let userTotal = overallTotal + review[i].data().qualityOfFood + review[i].data().serviceRating;
                    averageOfOne = userTotal/2;
                    overallTotal += averageOfOne;
                }
                const rating = overallTotal/review.length;
                setOverallRating(rating);
            }
            if (review.length > 0) {
                calcOverallRating();
            } else {
                setOverallRating("N/A");
            }
        },[review]
    )

    const submitReview = async () => {

        //update firebase
        await setDoc(doc(db,'posts',pid,'review',session.user?.uid),{
            name: session.user?.name,
            qualityOfFood: foodRating,
            serviceRating: serviceRating,
            comment: commentRef.current.value,
        })

    }

    return (
        <div className="px-2 md:px-5 bg-slate-100">
            <Navbar />
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 align-content:center sm:mr-100 sm:ml-100 mb-5">
                <div className="flex flex-col m-4 p-1">
                    {/* rating */}
                    <div className="flex"> 
                        <h1 className="text-7xl font-extrabold mr-2">{overallRating}</h1>
                        <h3 className="text-xl font-bold relative top-3 text-gray-400">/ 5</h3>
                    </div>
                    <h1 className="mt-3 text-4xl font-extrabold">{pin?.data().caption}</h1>
                    <h3 className="mt-2">Location: {pin?.data().deliveryLoc}</h3>
                    <h3 className="mt-2">Time: {pin?.data().deliveryTime}</h3>

                    {session.user?.uid == pin?.data().postedBy ? (
                    <div>
                        <h1 className="font-semibold mt-2">Ordered by...</h1>
                        <div className="flex space-x-4 overflow-x-auto bg-white p-4 rounded-md mt-2">
                        {/* the likes, shown only if owned by user*/}
                        {saves?.map((s)=>(
                            <div className="flex flex-col gap-2 items-center justify-center text-center">
                                <span className="font-semibold">{s.data().name}</span>
                                <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"/>
                            </div>
                        ))}
                    </div>
                    </div>
                    
                    ):<div></div>}
                </div>
                <div className="m-4 p-1">
                    {/* your review */}
                    <div className="mb-4">
                        <h3 className="text-xl font-extrabold mb-1"> Quality of food </h3>
                        <div className="flex flex-wrap">
                            {[...Array(5)].map((star,i) => {
                                let ratingValue = i + 1;
                                return(
                                    <label>
                                        <input type="radio" className="hidden" name="rating" value={ratingValue} onClick={()=>setFoodRating(ratingValue)}/>
                                        <FaStar size={20} 
                                        color={ratingValue <= foodRating ? "#ffc107" : "#e4e5e9"}/>
                                    </label>
                                )

                            })}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-extrabold mb-1"> Service </h3>
                        <div className="flex flex-wrap">
                            {[...Array(5)].map((star,i) => {
                                let ratingValue = i + 1;
                                return(
                                    <label>
                                        <input type="radio" className="hidden" name="rating" value={ratingValue} onClick={()=>setServiceRating(ratingValue)}/>
                                        <FaStar size={20} 
                                        color={ratingValue <= serviceRating ? "#ffc107" : "#e4e5e9"} />
                                    </label>
                                )

                            })}
                        </div>
                    </div>
                    <h3 className="text-xl font-extrabold mb-2"> Comment </h3>
                    <input 
                        type="text"
                        ref={commentRef}
                        className="block mb-4 p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={()=>submitReview()}
                    >Submit</button>
                </div>
                <div className="m-4 p-1">
                    {/* for the review, letting user review */}
                    <div className="text-center text-large flex gap-2 md:gap-2 w-full">
                        <h1 className="font-semibold ">Reviews</h1>
                    </div>
                    <ReviewBox reviews={review}/>
                </div>
            </div>

        </div>
    );
}

export default Post;