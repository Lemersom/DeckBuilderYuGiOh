import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';

function LoginRoute() {
  return (
    <Routes>
      <Login path="/login" element={<Login />} />
    </Routes>
  );
}

export default LoginRoute;
