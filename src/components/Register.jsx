import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/appContext'
import axios from 'axios';
import ErrorAlert from './ErrorAlert';

function Register() {

  const context = useContext(AppContext)

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null)


  const doNotClose = (event) => {
    event.stopPropagation();
  };


  const nameChange = (e) => {
    setName(e.target.value);
  };

  const imageChange = (e) => {
    setImage(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/card/', {
        name: name,
        image: image,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });

      //WebSocket
      context.socket.send(`Card created: ${name}`)

      setTimeout(() => {
        setShowModal(false)
      }, 5000)
      window.location.reload(false);
      setError(null)
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
      setError(error+'');
    }

  };

  return (
    <div className="login-container main-popup">
      <div className='box-register' onClick={doNotClose}>
        <h2>New Card</h2>
        <div className='form'>
          {error && <ErrorAlert message={error} />}
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              onChange={nameChange}
              required
              placeholder='Name'
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="image"
              name="image"
              onChange={imageChange}
              required
              placeholder='Image Url'
            />
          </div>

        </div>

      </div>
      <button type="submit" className='button-register' onClick={submitForm}>Save</button>
    </div>
  );
}

export default Register;
