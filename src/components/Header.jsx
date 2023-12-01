import '../App.css';
import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from '../assets/images/Yu-Gi-Oh.svg';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { createPortal } from 'react-dom';
import Register from './Register.jsx';
import QueryContext from '../QueryContext'


import { AppContext } from '../context/appContext.jsx';


export default function Header(props) {
  const [showModal, setShowModal] = useState(false);

  const context = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token');

    //WebSocket
    context.socket.close()
    
    location.reload();
  };

  return (

    <header>
      <div onClick={() => setShowModal(false)}>
        {showModal && createPortal(
          <div onClick={() => setShowModal(true)}>
            <Register />
          </div>,
          document.body
        )}
      </div>


      <AppBar position="static" className="App-header-bar" color="blueHeader">
        <Toolbar variant="dense" className='header-toolbar'>
          <img src={Image} alt='Logo' onClick={props.onClickLogo} className='header-logo' />


          <div className='actions-header'>
          <QueryContext.Provider value={{ setShowModal }}>
          <Button variant="contained" color="blueBtn" className="App-main-button" onClick={() => {
              setShowModal(true)
            }
            }>
              <Typography>New Card</Typography>
            </Button>
                </QueryContext.Provider>

          
            

            <Button variant='text' size='large' onClick={logout}>LOGOUT</Button>
          </div>

        </Toolbar>
      </AppBar>

    </header>

  )
}