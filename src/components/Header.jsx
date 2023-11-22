import '../App.css';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from '../assets/images/Yu-Gi-Oh.svg'

export default function Header(props) {

    return (

        <header>

          <AppBar position="static" className="App-header-bar" color="blueHeader">
            <Toolbar variant="dense" className='header-toolbar'>
              <img src={Image} alt='Logo' onClick={props.onClickLogo} className='header-logo'/>
            </Toolbar>
          </AppBar>

        </header>

    )
}