import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import './Header.css';

/*
  This is the Header component.

  It:
    - displays the top navigation bar of the website
    - shows links to different pages (Home, Movies & TV Shows)
    - contains buttons to open Login and Register modals
*/

const Header = () => {
  // State to control whether the Login modal is visible
  const [showLogin, setShowLogin] = useState(false);

  // State to control whether the Register modal is visible
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header className="header">
        <div className="logo"><Link to="/" className="logo-link">Obsidian</Link></div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies & TV Shows</Link></li>

            <li>
              <button onClick={() => setShowLogin(true)}>
                Login
              </button>
            </li>

            <li>
              <button onClick={() => setShowRegister(true)}>
                Register
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}
    </>
  );
};

export default Header;
