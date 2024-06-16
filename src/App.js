import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Authenticate from './components/Authenticate';
import Editpost from './components/Editpost';
import Sidebar from './components/Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.removeItem('token'); 
      setIsLoggedIn(false); // Ensure setIsLoggedIn is correctly set
      navigate('/');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (isCreate) {
      navigate('/editpost');
    }
  }, [isCreate, navigate]);

  return (
    <div>
      {isLoggedIn && <Sidebar setIsCreate={setIsCreate} handleLogout={handleLogout} />} {/* Ensure handleLogout is passed here */}
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" /> : <Authenticate setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home setIsCreate={setIsCreate} /> : <Navigate to="/" />}
          />
          <Route
            path="/editpost"
            element={isLoggedIn ? <Editpost setIsCreate={setIsCreate} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
