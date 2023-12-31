import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import axios from 'axios';
import ErrorAlert from './ErrorAlert';

import QueryContext from '../QueryContext';


export default function SearchView() {

    const { setCards, errorMsg, logoClicked, setMaxCards, setText } = useContext(QueryContext)
    
    const [placeholder, setPlaceholder] = React.useState("name")
    const [textFieldValue, setTextFieldValue] = React.useState("")
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null)
    

    const keyPressed = (event) => {
      if(event.keyCode === 13){
        searchFunction()
      }
    }

    const searchFunction = async (e) => {
      try {
        if(textFieldValue != ''){
          const response = await axios.get(`http://localhost:3000/api/card/${textFieldValue}?limit=4&page=${page}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
            
          }); 
          setPage(page)
          setCards(response.data.rows);
          setText(textFieldValue)
          setMaxCards(response.data.count)
          setError(null)
        }else{
          const response = await axios.get(`http://localhost:3000/api/card?limit=4&page=${page}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
          });   
          setText('')
          setCards(response.data.rows);
          setMaxCards(response.data.count)
          setError(null)
        }
        
        
      } catch (error) {
        console.error('Erro durante a solicitação:', error);
        setError(error+'');
      }
    }

    useEffect(() => {
      setPlaceholder("name")
      setTextFieldValue("")
    }, [logoClicked, page, error]);

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
            
            {error && <ErrorAlert message={error} />}

            <div className='msg-div'>
              <Typography className='error-msg' variant='h5' display={errorMsg ? "block" : "none"}>Failed to find cards</Typography>
            </div>
        

          </div>
    )
}