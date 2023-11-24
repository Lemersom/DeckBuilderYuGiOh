import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className='box-login'>
      <h2>Welcome</h2>
      <form onSubmit={()=> navigate('/home')} className='form'>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"

            required
            placeholder='Usuário'
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"

            required
            placeholder='Senha'
          />
        </div>
        <button type="submit" className='button-submit'>Login</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
