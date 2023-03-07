import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { AuthProvider } from './features/auth/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
