import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./firebase.js"
import { BrowserRouter } from 'react-router-dom';
// import {firebaseApp as app, auth} from './firebase' //Import app from firebase.js


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
