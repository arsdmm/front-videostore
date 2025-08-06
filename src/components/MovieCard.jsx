import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ id, title, imageUrl }) => {
  return (
    <Link to={`/movies/${id}`} className="movie-card">
      <div className="card">
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
