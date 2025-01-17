import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import "./SignupPage.css";

const SignupPage = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errormessage, setErrormessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setErrormessage("Passwords do not match!");
    } else {
      setErrormessage('');
      alert('Form submitted successfully!'); // Placeholder for backend integration
    }
  };

  return (
    <div className="SignupBG">
      <article className="SignupArticle">
        <h1>SIGN UP NOW</h1>
        <form className="SignupForm" onSubmit={handleFormSubmit}>
          <label>
            First Name:
            <input 
              type="text" 
              value={firstname} 
              onChange={(e) => setFirstname(e.target.value)} 
              required 
            />
          </label>
          <label>
            Last Name:
            <input 
              type="text" 
              value={lastname} 
              onChange={(e) => setLastname(e.target.value)} 
              required 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </label>
          <label>
            Phone Number:
            <input 
              type="tel" 
              value={phoneno} 
              onChange={(e) => setPhoneno(e.target.value)} 
              required 
            />
          </label>
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </label>
          <label>
            Confirm Password:
            <input 
              type="password" 
              value={confirmpassword} 
              onChange={(e) => setConfirmpassword(e.target.value)} 
              required 
            />
          </label>
          {errormessage && <div className="SignupErrorText">{errormessage}</div>}
          <button type="submit">Sign Up</button>
        </form>
      </article>
    </div>
  )
}

export default SignupPage;