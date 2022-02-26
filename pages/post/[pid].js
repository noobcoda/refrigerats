import React from 'react';
import { useRouter } from "next/router";
import { Navbar } from "../../components";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, deleteDoc, collection, setDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";

const Post = () => {
    const { data: session } = useSession();
    console.log(session);
    const router = useRouter();
    const {pid} = router.query;
    console.log(pid);
    const [pin,setPin] = useState(null);
    const [hasReviewed,setHasReviewed] = useState(false);
    const [foodRating,setFoodRating] = useState(null);
    const [serviceRating, setServiceRating] = useState(null);
    const [userComment, setUserComment] = useState(null);
    const [comments,setComments] = useState([]);
    const [review,setReview] = useState([]);

    useEffect(
        () => 
            onSnapshot(
                query(
                    collection(db,'posts',pid,'review'),
                ),
                (snapshot) => setReview(snapshot.docs)
            ),
        [db,pid],
    );

    useEffect(
        () => 
            setHasReviewed(
                review.findIndex((review) => (review.id === session?.user?.uid)) !== -1
            ),
        [review]
    );

    useEffect(
        () => 
            onSnapshot(
                query(
                    collection(db,'posts',pid,'review',session.user?.uid,'qualityOfFood'),
                ),
                (snapshot) => setFoodRating(snapshot.docs)
            ),
        [db,pid],
    );

    useEffect(
        () => 
            onSnapshot(
                query(
                    collection(db,'posts',pid,'review',session.user?.uid,'serviceRating'),
                ),
                (snapshot) => setServiceRating(snapshot.docs)
            ),
        [db,pid],
    );

    const submitReview = async () => {

        //update firebase
        await setDoc(doc(db,'posts',pid,'review',session.user?.uid),{
            name: session.user?.name,
            qualityOfFood: foodRating,
            serviceRating: serviceRating,
            comment: userComment,
        })

    }

    return (
        <div className="px-2 md:px-5">
            <Navbar />
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col m-4 p-1">
                    {/* rating */}
                    <div className="flex"> 
                        <h1 className="text-7xl font-extrabold mr-2">4.8 </h1>
                        <h3 className="text-xl font-bold relative top-3 text-gray-400">/ 5</h3>
                    </div>
                    <h1 className="mt-3 text-4xl font-extrabold">Burger</h1>
                    <h3 className="mt-2">Descripttttttttttttttion</h3>
                    <div>
                        {/* the actual post*/}
                    </div>
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
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={()=>submitReview()}
                    >Submit</button>
                </div>
                <div className="m-4 p-1">
                    {/* for the review, letting user review */}
                    <div className="text-center text-large flex gap-2 md:gap-2 w-full">
                        {/* <HiStar className="fill-lime-400"/> */}
                        <h1 className="font-semibold ">2 reviews</h1>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Post;