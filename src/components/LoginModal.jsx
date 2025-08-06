import React, { useState } from 'react';
import './Modal.css';

/* 
  LoginModal component handles user login within a modal window.
  It provides fields for email and password, and sends the data to the backend API.
  It also shows a feedback message based on the login result.
  The component receives one prop: onClose — a function to close the modal.
*/
const LoginModal = ({ onClose }) => {
  /* 
    State variables:
    - email: stores the user's input for email
    - password: stores the user's input for password
    - message: stores feedback message (success or error)
  */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  /* 
    handleLogin is called when the user clicks "Enter".
    It sends a POST request to the backend login API with the email and password.
    If login is successful:
      - shows "Login successful!" message
      - waits 2 seconds and closes the modal
    If login fails:
      - displays error message from backend or default message
    If an error occurs (e.g., network/server issue):
      - shows a general server error message
  */
  const handleLogin = async () => {
    try {
      const response = await fetch('https://backend-videostore.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        setTimeout(() => {
          onClose();
          setMessage('');
        }, 2000);
      } else {
        setMessage(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setMessage('Server error. Please try again later.');
    }
  };

  /* 
    JSX layout:
    - modal-backdrop darkens the background
    - modal-box contains:
        - title
        - input fields for email and password
        - feedback message (if any)
        - "Enter" and "Close" buttons
  */
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2 className="modal-title">Login to Obsidian</h2>

        <input
          className="modal-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="modal-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && <p className="modal-message">{message}</p>}

        <div className="modal-buttons">
          <button className="submit-btn" onClick={handleLogin}>Enter</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
