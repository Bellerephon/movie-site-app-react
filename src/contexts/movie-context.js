import { createContext, useContext } from "react";
import { useLocalStorage } from "../useLocalStorage";
import { useAllMovies } from '../hooks/useAllMovies';
import { useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
    const [favMovies, setFavMovies] = useState([])
    const movies = useAllMovies();
    
    // localstorage state
    const [favorites, setFavorites] = useLocalStorage("fav", []);

    const addToFavorites = (movie) => {
        let isOnArray = false;
        favorites.map((fav) => {
          if (fav.id === movie.id) {
            isOnArray = true;
          }
        });
    
        if (isOnArray) {
          setFavorites(favorites.filter((fav) => fav.id !== movie.id));
        } else {
          setFavorites((prevState) => [...prevState, movie]);
        }
      };
    
      const getFavorites = () => {
        setFavMovies(favorites);
      };
    
      const isFav = (id) => {
        let fav = favorites.filter((fav) => fav.id === id);
        return fav.length === 0 ? true : false;
      };

    return (
        <MovieContext.Provider
            value={{ addToFavorites, isFav, getFavorites, movies, favorites, favMovies }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export const useMovieContext = () => {
    return useContext(MovieContext);
}

