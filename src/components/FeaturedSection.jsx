import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedSection.css';

/*
  FeaturedSection is a reusable component that displays
  either featured movies or featured TV shows in a grid layout.

  Props:
    - endpoint → a string, either "movies" or "tvshows"
    - title → the section heading to display, e.g. "Featured Movies"

  Example usage:
    <FeaturedSection endpoint="movies" title="Featured Movies" />
*/

const FeaturedSection = ({ endpoint, title }) => {
  // State to hold the fetched data (array of items)
  const [items, setItems] = useState([]);

  useEffect(() => {
    /*
      This useEffect runs on mount and whenever `endpoint` changes.
      It performs a fetch request to the deployed backend API.

      For example:
        GET https://backend-videostore.onrender.com/api/movies?type=movies
        or
        GET https://backend-videostore.onrender.com/api/movies?type=tvshows
    */
    fetch(`https://backend-videostore.onrender.com/api/movies?type=${endpoint}`)
      .then(res => res.json())
      .then(data => {
        /*
          We only want to display the first 8 items in the featured section.
          So we slice the returned data array.
        */
        setItems(data.slice(0, 8));
      });
  }, [endpoint]);

  return (
    <section className="featured-section">
      {/* Section title (e.g. "Featured Movies" or "Featured TV Shows") */}
      <h2>{title}</h2>

      <div className="featured-grid">
        {/* 
          Loop through the fetched items and display them.
          Each item shows:
            - an image (poster)
            - the title
          The entire card is clickable and links to a details page.
        */}
        {items.map(item => (
          <Link to={`/${item.type}/${item._id}`} key={item._id}>
            <div className="card">
              <img src={item.imageUrl} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
