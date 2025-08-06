import React from 'react';
import './Modal.css';

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2 className="modal-title">Login to Obsidian</h2>
        <input className="modal-input" placeholder="Email" type="email" />
        <input className="modal-input" placeholder="Password" type="password" />
        <div className="modal-buttons">
          <button className="submit-btn">Enter</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

