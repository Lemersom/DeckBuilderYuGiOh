import '../App.css';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from '../assets/images/Yu-Gi-Oh.svg';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';



export default function Header(props) {

    return (

        <header>

          <AppBar position="static" className="App-header-bar" color="blueHeader">
            <Toolbar variant="dense" className='header-toolbar'>
              <img src={Image} alt='Logo' onClick={props.onClickLogo} className='header-logo'/>

              <Button variant="contained" color="blueBtn" className="App-main-button" onClick={ () =>
                        
        {showModal && createPortal(
          <div onClick={() => setShowModal(false)}>
              <Register />
          </div>,
          document.body
        )}
              }>
                    <Typography>New Card</Typography>
              </Button>
            </Toolbar>
          </AppBar>

        </header>

    )
}