// import React, { useState} from 'react';

// import Logo from '../../olx-logo.png';
// import './Signup.css';
// import { firebase } from '../../store/FirebaseContext';
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import context from 'react-bootstrap/esm/AccordionContext';

// export default function Signup() {
//   // const auth =useAuth();
//   const [username,setUsername]=useState('');
//   const [email,setEmail]=useState('');
//   const [phone,setPhone]=useState('');
//   const [password,setPassword]=useState('');
  // deconstructing the context
  // const {firebase}=useContext(FirebaseContext)

  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   console.log(firebase)
  //   createUserWithEmailAndPassword(auth,email,password).then((result)=>{
  //     result.user.updateProfile({displayName:username})
  //   })
  // }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const result = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log("Registration Result:", result); // Log the result object
  //     if (result && result.user) {
  //       // Only call updateProfile if result.user exists
  //       await updateProfile(result.user, { displayName: username });
  //       console.log('User registered and profile updated successfully');
  //     } else {
  //       console.error('User object not available');
  //     }
  //   } catch (error) {
  //     console.error('Error registering user:', error.message); // Improved error logging
  //   }
  // };

import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { auth,db} from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate,Link } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with username
      await updateProfile(userCredential.user, {
        displayName: username
      });

      //Add userdata to firestore
      await addDoc(collection(db, "users"), {
        uuid: userCredential.user.uid,
        name: username,
        phone: phone,
        email: email
      });


      console.log('User registered successfully');
      // Navigate to home page or login page after successful registration
      // navigate('/');
      navigate('/login');
      
    } catch (error) {
      setError(error.message);
      console.error('Registration error:', error);
    }
  };
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
