import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://backend-videostore.onrender.com/api/${id}`)
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

  if (error) return <div className="movie-details-error">{error}</div>;
  if (!item) return <div className="movie-details-loading">Loading...</div>;

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
