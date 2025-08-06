import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import './Header.css';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetch(`https://backend-videostore.onrender.com/api/movies/search?title=${query}`)
        .then(res => res.json())
        .then(data => setResults(data.slice(0, 5)))
        .catch(err => console.error('Search error:', err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (id, type) => {
    navigate(`/${type}s/${id}`);
    setQuery('');
    setResults([]);
  };

  return (
    <>
      <header className="header">
        <div className="left">
          <Link to="/" className="logo-link">Obsidian</Link>
        </div>

        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className={`search-dropdown ${results.length > 0 ? 'show' : ''}`}>
              {results.map(item => (
                <li key={item.id} onClick={() => handleSelect(item.id, item.type)}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies & TV Shows</Link></li>
              <li><button onClick={() => setShowLogin(true)}>Login</button></li>
              <li><button onClick={() => setShowRegister(true)}>Register</button></li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
