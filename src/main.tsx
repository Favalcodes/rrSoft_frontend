import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios';
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
)
