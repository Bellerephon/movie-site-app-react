import './App.scss';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/home';
import { Favourites } from './components/catalog/favourites';
import { Contacts } from './components/contacts/contacts';
import { About } from './components/about/about';
import { NotFound } from './components/not-found/not-found';
import { MovieList } from './components/movie-list/movie-list';
import { MovieDetails } from './components/catalog/movie-details/movie-details';
import { UserAuthContextProvider } from './contexts/user-auth-context';
import { MovieContext } from './contexts/movie-context';
import { useAllMovies } from './hooks/useAllMovies';
import { lazy, Suspense } from 'react';

const Profile = lazy(() => import('./components/profile/profile'));
const Catalog = lazy(() => import('./components/catalog/catalog'));

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
          <Route path="/catalog" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Catalog />
            </Suspense>} />
          <Route path="/catalog/:movieId/*" element={<MovieDetails />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie-list" element={<MovieList />} />
          <Route path="/profile/:userID/*" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>} />
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
