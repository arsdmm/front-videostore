import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import './Header.css';

/* 
  The Header component renders the top navigation bar of the app.
  It includes the logo, a search bar with dynamic results, navigation links,
  and buttons to open login/register modals.
*/
const Header = () => {
  /* 
    Controls whether the login modal is visible.
    Initially set to false, changed to true when "Login" button is clicked.
  */
  const [showLogin, setShowLogin] = useState(false);

  /* 
    Controls whether the register modal is visible.
    Triggered by the "Register" button.
  */
  const [showRegister, setShowRegister] = useState(false);

  /* 
    Stores the current value of the search input field.
    Updated every time the user types in the search bar.
  */
  const [query, setQuery] = useState('');

  /* 
    Stores the search results fetched from the API.
    These are displayed in a dropdown under the search bar.
  */
  const [results, setResults] = useState([]);

  /* 
    useNavigate is a React Router hook used to navigate programmatically.
    Used here to redirect the user to the selected movie/TV show page.
  */
  const navigate = useNavigate();

  /* 
    useEffect runs every time the `query` value changes.
    If the query is empty, it clears the results.
    Otherwise, it waits 300ms (debounce) before sending a fetch request
    to the backend to search for movies matching the query.
    Only the first 5 results are saved and displayed.
  */
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

  /* 
    This function is called when the user selects a search result.
    It navigates to the detail page for the selected movie or TV show,
    then clears the search input and closes the dropdown.
  */
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
