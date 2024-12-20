import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login'

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
      
    
    </div>
    </>
  );
  
}

export default App;
