import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../styles/Listing.css';

const MoviesListing = () => {
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvshows] = useState([]);

  useEffect(() => {
    // Fetch movies (type = movies)
    fetch(`${import.meta.env.VITE_API_BASE_URL}?type=movies`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Error fetching movies:', err));

    // Fetch tvshows (type = tvshows)
    fetch(`${import.meta.env.VITE_API_BASE_URL}?type=tvshows`)
      .then(res => res.json())
      .then(data => setTvshows(data))
      .catch(err => console.error('Error fetching tvshows:', err));
  }, []);

  return (
    <>
      <Header />

      <main className="listing-container">
        <section>
          <h1 className="section-title">Movies</h1>
          <div className="grid-wrapper">
            {movies.map(movie => (
              <Link key={movie.id} to={`/movies/${movie.id}`} className="card-link">
                <div className="listing-card">
                  <img src={movie.posterSmall} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h1 className="section-title">TV Shows</h1>
          <div className="grid-wrapper">
            {tvshows.map(show => (
              <Link key={show.id} to={`/tvshows/${show.id}`} className="card-link">
                <div className="listing-card">
                  <img src={show.posterSmall} alt={show.title} />
                  <h3>{show.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MoviesListing;
