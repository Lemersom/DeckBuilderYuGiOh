import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/Register';

function RegisterRoute() {
  return (
    <Routes>
      <Register path="/register" element={<Register />} />
    </Routes>
  );
}

export default RegisterRoute;