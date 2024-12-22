import React, { useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { auth } from './firebase/config';
import Details from './store/PostContext'

function App() {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe(); // Cleanup subscription
  }, [setUser]); // Add setUser to dependency array

  return (
    <Details>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<Create />} />
        <Route path='/view' element={<View />} />
      </Routes>
    </Details>
  );
}

export default App;
