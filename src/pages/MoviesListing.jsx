import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../styles/Listing.css';

/* 
  MoviesListing component displays a page with two sections:
  - A list of movies
  - A list of TV shows

  It fetches the data from the backend when the component mounts,
  and renders each item as a clickable card that links to the detail page.
*/
const MoviesListing = () => {
  /* 
    State variables:
    - movies: stores the array of movie objects fetched from the API
    - tvshows: stores the array of TV show objects fetched from the API
  */
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvshows] = useState([]);

  /* 
    useEffect runs only once on component mount.
    It sends two separate fetch requests:
    - One for movies (with type=movie)
    - One for TV shows (with type=tvshow)

    On success, it updates the corresponding state.
    On error, it logs the issue to the console.
  */
  useEffect(() => {
    // Fetch movies (type = movies)
    fetch('https://backend-videostore.onrender.com/api/movies?type=movie')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Error fetching movies:', err));

    // Fetch tvshows (type = tvshows)
    fetch('https://backend-videostore.onrender.com/api/movies?type=tvshow')
      .then(res => res.json())
      .then(data => setTvshows(data))
      .catch(err => console.error('Error fetching tvshows:', err));
  }, []);

  /* 
    JSX layout:
    - Includes Header and Footer components
    - Two sections: one for Movies, one for TV Shows
    - Each section contains a title and a grid of cards
    - Each card links to the corresponding detail page (based on ID and type)
  */
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
                  <img src={movie.imageUrl} alt={movie.title} />
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
                  <img src={show.imageUrl} alt={show.title} />
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
