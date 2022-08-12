import './App.scss';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/home';
import { Favorites } from './components/catalog/favorites';
import { TopRated } from './components/top-rated/top-rated';
import { About } from './components/about/about';
import { NotFound } from './components/not-found/not-found';
import { MovieList } from './components/movie-list/movie-list';
import { MovieDetails } from './components/catalog/movie-details/movie-details';
import { UserAuthContextProvider } from './contexts/user-auth-context';
import { MovieProvider } from './contexts/movie-context';
import { lazy, Suspense } from 'react';

const Profile = lazy(() => import('./components/user-area/profile/profile'));
const Catalog = lazy(() => import('./components/catalog/catalog'));

function App() {

  return (
    <UserAuthContextProvider>
      <div className='App'>
        <Header />
        <MovieProvider>
        <main className='py-3' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Catalog />
            </Suspense>} />
          <Route path="/catalog/:movieId/*" element={<MovieDetails />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie-list" element={<MovieList />} />
          <Route path="/profile/:userID/*" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <main className='py-3' />
        </MovieProvider>
        <Footer />
      </div>
    </UserAuthContextProvider>
  );
}

export default App;
