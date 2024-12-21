import React,{useEffect,useContext}  from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Create from './Pages/Create'
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { auth } from './firebase/config';

function App() {
  const {user,setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
    console.log(user)
  })
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/create' element={<Create />}></Route>
        
      </Routes>
      
    
    </div>
    </>
  );
  
}

export default App;
