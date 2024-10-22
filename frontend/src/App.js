// App.js
import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import Search from './components/Search';
import Confirm from './components/Confirm';
import Login from './authentication/login';
import Register from './authentication/register';
const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/confirm" element={<Confirm />} />
    </Routes>
  );
};

export default App;
