import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

function HomeRoute() {
  return (
    <Routes>
      <Home path="/home" element={<Home />} />
    </Routes>
  );
}

export default HomeRoute;
