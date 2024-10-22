// App.js
import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import Search from './components/Search';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default App;
