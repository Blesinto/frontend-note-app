// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import LandingPage from './pages/landing/LandingPage';
import NoteDetail from './components/NoteDetail/NoteDetail';
import Loading from './components/Loading/Loading.jsx';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loading spinner for 3 seconds

    // Clear timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<LandingPage />} />
        <Route path='/dashboard' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/note/:id' element={<NoteDetail />} />
        <Route path='*' element={<NoteDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
