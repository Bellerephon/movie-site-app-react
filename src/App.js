


import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/home';
import { Favourites } from './components/favourites/favourites';
import { Watchlist } from './components/watchlist/watchlist';
import { Contacts } from './components/contacts/contacts';
import { About } from './components/about/about';
import { NotFound } from './components/not-found/not-found';
import { MovieList } from './components/movie-list/movie-list';
import { Profile } from './components/profile/profile';
import { MovieDetails } from './components/catalog/movie-details/movie-details';
import { Catalog } from './components/catalog/catalog';
import { UserAuthContextProvider } from './contexts/user-auth-context';
import { MovieContext } from './contexts/movie-context';
import { useAllMovies } from './hooks/useAllMovies';


function App() {

  const movies = useAllMovies();

  return (
    <UserAuthContextProvider>
      <div className='App'>
        <Header />
        <MovieContext.Provider value={{movies}}>
        <main className='py-3' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:movieId/*" element={<MovieDetails />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie-list" element={<MovieList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <main className='py-3' />
        </MovieContext.Provider>
        <Footer />
      </div>
    </UserAuthContextProvider>
  );
}

export default App;
