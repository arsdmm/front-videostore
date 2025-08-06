import React, { useState } from 'react';
import './Modal.css';

/* 
  RegisterModal component provides a modal window that allows users to register.
  It contains input fields for full name, email, and password,
  and communicates with the backend to create a new user account.
  The component receives one prop: onClose — a function to close the modal.
*/
const RegisterModal = ({ onClose }) => {
  /* 
    State variables:
    - fullName: stores the user's full name input
    - email: stores the user's email input
    - password: stores the user's password input
    - message: stores a feedback message shown after form submission
  */
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  /* 
    handleRegister is called when the user clicks the "Sign Up" button.
    It sends a POST request to the backend registration API with the form data.

    If registration is successful:
      - Displays a success message
      - Closes the modal automatically after 2 seconds

    If registration fails:
      - Displays an error message from the backend, or a default one

    If there is a network/server error:
      - Displays a general error message
  */
  const handleRegister = async () => {
    try {
      const response = await fetch('https://backend-videostore.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Account created successfully!');
        setTimeout(onClose, 2000); // auto-close after success
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  /* 
    JSX layout:
    - modal-backdrop creates a dark overlay
    - modal-box contains:
        - Title
        - Input fields for full name, email, password
        - Feedback message (shown if present)
        - "Sign Up" button to trigger registration
        - "Close" button to dismiss the modal
  */
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2 className="modal-title">Create Your Account</h2>
        <input
          className="modal-input"
          placeholder="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          <button className="submit-btn" onClick={handleRegister}>Sign Up</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
