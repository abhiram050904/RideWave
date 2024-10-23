import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import Search from './components/Search';
import Confirm from './components/Confirm';
import Login from './authentication/login';
import Register from './authentication/register';
import Finalpage from './components/Finalpage';
// Import the global CSS file
import '../src/App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/final" element={<Finalpage />} />
    </Routes>
  );
};

export default App;
