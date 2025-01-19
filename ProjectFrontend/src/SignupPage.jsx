import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SignupPage.css";

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/cat201project/SignupServlet', {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });

      if (response.data.status === 'success') {
        navigate('/LoginPage'); // Redirect to login page after successful signup
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred during signup.');
      console.error('Signup error:', error);
    }
  };

  const handleBackToLogin = () => {
    navigate('/LoginPage'); // Redirect to the login page
  };

  return (
    <div className="SignupBG">
      <article className="SignupArticle">
        <h1>Sign Up</h1>
        <form className="SignupForm" onSubmit={handleSignup}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label>
            Confirm Password:
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </label>
          <button type="submit">Sign Up</button>
          <button onClick={handleBackToLogin}>Log In</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      </article>
    </div>
  );
};

export default SignupPage;