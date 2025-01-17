import React, {useState} from 'react';
import PharmacyLogo from "./assets/LoginPageAssets/PharmacyLogo.jpeg";
import { Link } from 'react-router-dom';
import "./LoginPage.css"

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // This is a placeholder for login functionality
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="LoginBG">
      <article className="LoginArticle">
        <h1>WELCOME</h1>
        <img src={PharmacyLogo} alt="Pharmacy Logo" className="LoginLogo" />
        <div className="LoginForm">
          <label>
            Username:
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter username" 
            />
          </label>
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password" 
            />
          </label>
          <button onClick={handleLogin}>LOGIN</button>
          <Link to="/SignupPage" className="Signupbutton">SIGN UP</Link>
        </div>
      </article>
    </div>


  )
}

export default LoginPage;