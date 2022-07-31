import { useState, useEffect } from "react";
import { db } from "../lib/init-firebase";
import { collection, onSnapshot } from 'firebase/firestore';

export const useAllMovies = () => {
    const [movies, setMovies] = useState([]);
    const moviesRef = collection(db, "movies");
  
    useEffect(() => {
      return onSnapshot(moviesRef, (snapshot) => {
        setMovies(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            return { id: doc.id, ...data };
          })
        );
      });
    }, []);
  
    return movies;
  };