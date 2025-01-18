import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PharmacyLogo from "./assets/LoginPageAssets/LoginLogo.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./LoginPage.css"

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Project/LoginServlet', {
        email: email,
        password: password
      });

      const data = response.data;
      if (data.status === 'success') {
        // Handle successful login (e.g., redirect to landing page)
        navigate('/LandingPage');
      } else {
        // Handle login error
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="LoginBG">
      <article className="LoginArticle">
        <h1>WELCOME</h1>
        <img src={PharmacyLogo} alt="Pharmacy Logo" className="LoginLogo" />
        <div className="LoginForm">
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter email" 
              required 
            />
          </label>
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password" 
              required 
            />
          </label>
          <button onClick={handleLogin}>LOGIN</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <Link to="/SignupPage" className="Signupbutton">SIGN UP</Link>
        </div>
      </article>
    </div>
  )
}

export default LoginPage;