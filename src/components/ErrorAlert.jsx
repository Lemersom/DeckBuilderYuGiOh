import React from 'react';

const ErrorAlert = ({ message }) => {
  return (
    <div className='div-error'>
      {message}
    </div>
  );
};

export default ErrorAlert;