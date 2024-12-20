import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import {FirebaseContext} from './store/FirebaseContext.jsx'
import {auth} from './firebase/config'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FirebaseContext.Provider value={{auth}}>
    <App />
    </FirebaseContext.Provider>
    </BrowserRouter>
  </StrictMode>
)
