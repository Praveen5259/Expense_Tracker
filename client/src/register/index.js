import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import './styles.css'
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors,setErrors] = useState({})
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('')
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if(name && email && pwd){
      fetch('http://localhost:5000/register', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         name: name,
         email: email,
         pwd: pwd
        })
       }).then((res) => {
        return res.json();
      })
      .then((data) => {
        setRegistrationMessage(data.message)
        setConfirmationMessage('Registration successful.');
        setTimeout(() => {
          setConfirmationMessage(''); // Clear confirmation message after 3 seconds
          navigate('/');
        }, 1000);
      });
    } else {
      setErrors('Please enter in all required fields')
    }
    
  };

  return (
    <div className="FullPage">
      {registrationMessage && <h3 className="confirmationMessage">{registrationMessage}</h3>}
        {confirmationMessage && <h3 className="confirmationMessage">{confirmationMessage}</h3>}
    <div className="outerBorder1">
      <h1>Registeration</h1>
      <form method="post"  onSubmit={onSubmit}>
      <div className="inputBlock1">
      <div><label>Name</label><br /></div> 
        <input
        className="inputField1"
          type="textbox"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {errors?.name && <p style={{color:'red'}}>{errors?.name}</p>}
        <br />
        <div><label>Email</label><br /></div>
        <input
        className="inputField1"
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {errors?.email && <p style={{color:'red'}}>{errors.email}</p>}
        <br />
        <div><label>Password</label><br /></div>
        <input
        className="inputField1"
          type="password"
          id="password"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
        {errors?.pwd && <p style={{color:'red'}}>{errors.pwd}</p>}
        <br />
        <br />
        </div>
        <button type="submit" value="Register" className="RegisterButton">
          Register
        </button>
      </form>
    </div>
    </div>
  );
};
export default Register;
