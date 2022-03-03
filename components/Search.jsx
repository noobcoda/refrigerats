import React, { useState, useEffect } from 'react';
import { Spinner, MyMasonry } from '.';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Search({ searchTerm }) {
  const [pins,setPins] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      return onSnapshot(query(collection(db,'posts'),where('caption','>=',`${searchTerm}`),where('caption','<=',`${searchTerm}`)),snapshot => {
        setPins(snapshot.docs);
        setLoading(false);
      })

    } else {
      //just get our normal pins
      return onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot => {
        setPins(snapshot.docs);
        setLoading(false);
      })
    }
  }, [searchTerm,db])
  
  return (
    <div>
      {loading && <Spinner message="Searching for pins..."/>}
      {pins?.length !== 0 && <MyMasonry pins={pins}/>}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">
          Oops! Much empty :(
        </div>
      )}
    </div>
  );
}
