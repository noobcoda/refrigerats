import React, { useState, useEffect } from 'react';
import Spinner from "./Spinner";
import MyMasonry from './MyMasonry';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function Feed(){
  const [loading,setLoading] = useState(false);
  const [pins,setPins] = useState(null);


  useEffect(()=>{
    setLoading(true);
    //firebase call whenever category changes

    //snapshot is a realtime listener to the actual backend
    return onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot => {
      setPins(snapshot.docs);
      setLoading(false);
    })

    // if (categoryId) {
    //   continue

    // } else { //else all things loaded

    // }
  },[db])
  //[categoryId,db]

  return (

    <div>
      {loading ? <Spinner message="Food will be served soon!"/>:
      <div>
        {/* {pins && <MyMasonry pins={pins}/>} */}
        <MyMasonry pins={pins}/>
      </div>}
    </div>
  );
}
