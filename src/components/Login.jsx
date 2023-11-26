import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login/', {
        email: email,
        password: password,
      });
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
    }
  };

  return (
    <div className="login-container">
      <div className='box-login'>
        <h2>Welcome</h2>
        <form className='form' onSubmit={submitForm}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={userChange}
              required
              placeholder='Usuário'
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={passwordChange}
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
