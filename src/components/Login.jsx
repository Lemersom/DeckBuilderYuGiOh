import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/appContext';
import axios from 'axios';

function Login({ onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(AppContext)

  let cont = 3

  const userChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const submitForm = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:3000/login/', {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data);
      context.setUserEmail(email)
      //WebSocket 
      context.setSocket()
      context.setToken(localStorage.getItem('token'))
      onLogin(false)
    } 
    catch (error) {
      cont -=1
      console.error('Erro durante a solicitação:', error);
      console.log(cont)
      if(cont == 0) {
        console.log('aguarde 10 segundos para tentar novamente')
        await delay(10000)
        cont = 3
        console.log(cont)
        return
      }
      console.log(`Restam ${cont} tentativa(s)`)
    }
  };

  return (
    <div className="login-container">
      <div className='box-login'>
        <h2>Welcome</h2>
        <div className='form'>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={userChange}
              required
              placeholder='User'
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
              placeholder='Password'
            />
          </div>
          <button type="submit" className='button-submit' onClick={submitForm}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
