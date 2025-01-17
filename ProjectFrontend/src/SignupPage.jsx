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

  return (
    <div className="SignupBG">
      <article className="SignupArticle">
        <h1>SIGN UP NOW</h1>
      </article>
    </div>
  )
}

export default SignupPage;