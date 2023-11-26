import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className='box-login'>
      <h2>New Card</h2>
      <form onSubmit={() => setShowModal(false)} className='form'>
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder='Name'
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="image"
            name="image"

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
