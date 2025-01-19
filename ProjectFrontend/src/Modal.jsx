import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css'; // Ensure you have the updated CSS file

const Modal = ({ message, onClose }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    if (!message) return null; // Don't render if there's no message

    const handleLoginRedirect = () => {
        navigate('/LoginPage'); // Change '/login' to your actual login route
        onClose(); // Close the modal after redirecting
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Error</h2>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
                <button onClick={handleLoginRedirect} className="login-button">Log in/sign up now</button>
            </div>
        </div>
    );
};

export default Modal;