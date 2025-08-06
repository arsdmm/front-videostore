import React from 'react';
import './HollywoodNewsSection.css';

const HollywoodNewsSection = () => {
  return (
    <section className="news-section">
      <h2>Hollywood News</h2>
      <div className="news-content">
        <p>
          From movie premieres to casting surprises — stay in the loop with the hottest news in the film industry.
          <br />
          Obsidian curates only what matters — fresh updates, major deals, and behind-the-scenes insights.
        </p>
        <button className="news-btn">Read More</button>
      </div>
    </section>
  );
};

export default HollywoodNewsSection;
