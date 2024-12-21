import React, { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate,Link } from 'react-router-dom';


function Login() {
  //setting the context
  const {auth}=useContext(FirebaseContext)

  // seting the state for the input fields
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error('Login failed:', err.message);
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your Email id"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            placeholder='Enter password'
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
