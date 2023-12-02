import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/appContext'
import axios from 'axios';

function Register() {

  const context = useContext(AppContext)

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      //context.setSocket()
      context.socket.send(`Card ${name} created by ${context.userEmail}`)

      setShowModal(false)

    } catch (error) {
      console.error('Erro durante a solicitação:', error);
    }
    
  };

  return (
    <div className="login-container main-popup">
      <div className='box-register' onClick={doNotClose}>
        <h2>New Card</h2>
        <div className='form'>
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
          <button type="submit" className='button-submit' onClick={submitForm}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
