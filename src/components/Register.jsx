import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/appContext'
import axios from 'axios';
import useWebSocket from 'react-use-websocket';

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
      //context.socket.send(`Card ${name} created by ${context.userEmail}`)
      sendJsonMessage({
        type: 'newCard',
        content: `Card ${name} created by ${context.userEmail}`
      })

      setShowModal(false)
      //location.reload(); //------------- FECHAR O MODAL AO INVÉS DE RECARREGAR
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
    }
    
  };

  const {sendJsonMessage} = useWebSocket('ws://localhost:8080', {
    share: true,
    filter: () => false
  })

  return (
    <div className="login-container main-popup">
      <div className='box-register' onClick={doNotClose}>
        <h2>New Card</h2>
        <form onSubmit={submitForm} className='form'>
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
          <button type="submit" className='button-submit'>Save</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
