import React, { useEffect, useState } from 'react';
import './HeroSection.css';

const slides = [
  {
    image: 'https://wallpapers.com/images/featured/frozen-2-pictures-dto1qadmjxjq8oet.jpg',
    title: 'Frozen II',
    subtitle: 'The magic returns.',
    button: 'Watch Now'
  },
  {
    image: 'https://images.alphacoders.com/100/1002901.jpg',
    title: 'Avengers: Endgame',
    subtitle: 'Part of the journey is the end.',
    button: 'Explore'
  },
  {
    image: 'https://images3.alphacoders.com/551/551456.jpg',
    title: 'Interstellar',
    subtitle: 'Space. Infinity. Hopelessness.',
    button: 'Dive In'
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.title} />
          <div className={`overlay ${index === current ? 'show' : ''}`}>
            <h2 className="slide-title">{slide.title}</h2>
            <p className="slide-subtitle">{slide.subtitle}</p>
            <button className="hero-btn">{slide.button}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
