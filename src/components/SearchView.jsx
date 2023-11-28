import React, { useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import QueryContext from '../QueryContext';


export default function SearchView() {

    const { setQuery, errorMsg, hintMsg, logoClicked } = useContext(QueryContext)
    
    const [placeholder, setPlaceholder] = React.useState("name")
    const [textFieldValue, setTextFieldValue] = React.useState("")

    const keyPressed = (event) => {
      if(event.keyCode === 13){
        searchFunction()
      }
    }

    const searchFunction = () => {
      setQuery(`&${textFieldValue}`)
    }

    useEffect(() => {
      setPlaceholder("name")
      setTextFieldValue("")
    }, [logoClicked]);

    return (
        <div className="App-main">

            <TextField 
              id="outlined-basic" 
              label={placeholder} 
              variant="outlined" 
              color="black"
              value={textFieldValue}
              onChange={(event) => setTextFieldValue(event.target.value)}
              onKeyUp={keyPressed}/>


            <Button variant="contained" color="blueBtn" className="App-main-button" onClick={searchFunction}>
                <Typography>Search</Typography>
            </Button>


            <div className='msg-div'>
              <Typography className='error-msg' variant='h5' display={errorMsg ? "block" : "none"}>Failed to find cards</Typography>
              <Typography className='hint-msg' variant='h6' display={!errorMsg && hintMsg ? "block" : "none"}>More Info: Click on the Card Image</Typography>
            </div>
        

          </div>
    )
}