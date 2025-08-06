import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviesListing from './pages/MoviesListing';
import MovieDetails from './pages/MovieDetails';

const App = () => {
  return (
    <div className="App">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesListing />} />
          <Route path="/movies/:id" element={<MovieDetails type="movies" />} />
          <Route path="/tvshows/:id" element={<MovieDetails type="tvshows" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

