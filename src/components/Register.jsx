import React, { useState } from 'react';
import axios from 'axios';

function Register() {

  const [name, setName] = useState('');
  const [image, setImage] = useState('');

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
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
    }
    setShowModal(false)
  };

  return (
    <div className="login-container main-popup">
      <div className='box-register'>
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
              placeholder='http://image.com'
            />
          </div>
          <button type="submit" className='button-submit'>Save</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
