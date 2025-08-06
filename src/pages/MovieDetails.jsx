import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/MovieDetails.css';

/* 
  MovieDetails component displays detailed information about a selected movie or TV show.
  It uses the `id` from the URL to fetch data from the backend and renders:
  - Poster
  - Title
  - Description
  - Rent and Buy prices

  It also includes loading and error handling states.
*/
const MovieDetails = () => {
  /* 
    useParams is used to extract the dynamic `id` from the route (e.g., /movies/:id).
    This ID is then used to fetch the corresponding movie from the backend.
  */
  const { id } = useParams();

  /* 
    item: stores the fetched movie/TV show data.
    error: stores error message (e.g., "Item not found").
  */
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  /* 
    useEffect runs once when the component mounts (or when `id` changes).
    It sends a GET request to fetch the movie/TV show details by ID.

    If the response is not ok or the data is empty, it sets an error.
    Otherwise, it saves the fetched item to state.
  */
  useEffect(() => {
    fetch(`https://backend-videostore.onrender.com/api/movies/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Item not found');
        }
        return res.json();
      })
      .then(data => {
        if (!data || Object.keys(data).length === 0) {
          setError('Item not found');
        } else {
          setItem(data);
        }
      })
      .catch(err => setError(err.message));
  }, [id]);

  /* 
    If an error occurred during fetch, display the error message.
    If data hasn't loaded yet, show a loading message.
  */
  if (error) return <div className="movie-details-error">{error}</div>;
  if (!item) return <div className="movie-details-loading">Loading...</div>;

  /* 
    Main UI structure:
    - Header at the top
    - Movie details in the center: poster and info
    - Footer at the bottom
  */
  return (
    <>
      <Header />

      <div className="movie-details-container">
        <div className="poster-section">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="poster-img"
          />
        </div>

        <div className="info-section">
          <h1 className="title">{item.title}</h1>
          <p className="description">{item.synopsis}</p>
          <div className="price-buttons">
            <button className="price-btn">Rent: ${item.priceRent}</button>
            <button className="price-btn">Buy: ${item.priceBuy}</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MovieDetails;
