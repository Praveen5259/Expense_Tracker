import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './styles.css';
import { saveDetails } from "../store/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pwd }) // Simplified object creation
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'Login successful') {
        dispatch(saveDetails({ name: data.name, email: data.email }));
        setConfirmationMessage('Login successful');
        setTimeout(() => {
          setConfirmationMessage(''); // Clear confirmation message after 3 seconds
          navigate('/dashboard');
        }, 1000);
      } else {
        setRegistrationMessage(data.message);
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      setRegistrationMessage('An error occurred. Please try again.'); // Set error message on fetch failure
    });
  };

  return (
    <div className="FullPage">
       {registrationMessage && <h3 className="confirmationMessage">{registrationMessage}</h3>}
        {confirmationMessage && <h3 className="confirmationMessage">{confirmationMessage}</h3>}
      <div className="outerBorder">
        <h1>Login</h1>
        <form method="post" onSubmit={onSubmit}>
          <div className="inputBlock">
            <div><label>Email</label><br /></div>
            <div> <input
              className="inputField"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /></div>
          </div>
          <div className="inputBlock">
            <label>Password</label> <br />
            <input
              className="inputField"
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default Login;
