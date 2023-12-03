import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { Grid, Snackbar } from '@mui/material';

import './App.css';

import QueryContext from './QueryContext'
import { AppContext } from './context/appContext.jsx';

import Card from './components/CardView.jsx';
import SearchView from './components/SearchView.jsx';
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import PopUp from './components/PopUp.jsx';


const theme = createTheme({
  palette: {
    black: {
      main: '#000',
      light: '#fff',
      dark: '#000',
      contrastText: '#fff',
    },
    white: {
      main: '#FFF',
      contrastText: '#FFF',
    },
    blueHeader: {
      main: '#0042B5',
      contrastText: '#FFF',
    },
    blueBtn: {
      main: '#0051DE',
      contrastText: '#FFF',
    },
  },
});

function App() {
  const [cards, setCards] = useState([]);
  const [maxCards, setMaxCards] = useState(0)
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("")
  const [errorMsg, setErrorMsg] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [especificCard, setEspecificCard] = useState(-1)
  const [scrollToTop, setScrollToTop] = useState(false);
  const [logoClicked, setLogoClicked] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [loginState, setLoginState] = useState(true);

  const context = useContext(AppContext)

  const resetQuery = () => {
    setQuery("")
    setPage(1)
    logoClicked ? setLogoClicked(0) : setLogoClicked(1)
  }

  const onChangePage = (event, value) => {
    setPage(value);
    setScrollToTop(true)
  };

  function showPopUp(id) {
    setEspecificCard(id)
    setShowModal(true)
  }

  const callApi = async () => {

    try {
      const link = `https://localhost:3000/api/card?limit=4&page=${page}`;

      const response = await axios.get(link, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const data = response.data;
      if (data.error) {
        setErrorMsg(true);
      } else {
        setErrorMsg(false);
        setCards(data.rows);
        setMaxCards(data.count);
        context.setToken(localStorage.getItem('token'))
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    callApi();
    if(context.token) setLoginState(false)
  }, [page, especificCard, context.token]);

  useEffect(() => {
    setPage(1)
  }, [query]);

  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setScrollToTop(false);
    }
  }, [scrollToTop]);

  //WebSocket
  useEffect(() => {
    //context.setSocket()
    context.socket.onmessage = (msg) => {
      setSnackbarMsg(msg.data)
      setSnackbarOpen(true)
    }
  }, []);

  return (
    <>
      {loginState ? (

        <div>
          <Login onLogin={setLoginState} />
        </div>
        

      ) : (

        <div>
          <div className="App">

            <ThemeProvider theme={theme}>

              {showModal && createPortal(
                <div className='popup-background' onClick={() => setShowModal(false)}>
                  <PopUp
                    image={cards[especificCard].image}
                  />
                </div>,
                document.body
              )}

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMsg}
              />

              <Header onClickLogo={resetQuery} />


              <main id="main">

                <QueryContext.Provider value={{ setCards, setQuery, setErrorMsg, logoClicked, setShowModal, setMaxCards }}>
                  <SearchView />
                </QueryContext.Provider>

                <Grid container spacing={4} align="center" className="main-card">
                  {
                    cards ?
                      !errorMsg && cards.map((card, index) => (
                        <Card
                          image={card.image}
                          name={card.name}
                          onClick={() => showPopUp(index)}
                        />
                      ))
                      : null
                  }

                </Grid>

                {!errorMsg &&
                  <Pagination
                    count={Math.ceil(maxCards / 4)}
                    page={page}
                    onChange={onChangePage}
                    className='main-pagination-bar'
                    variant="outlined"
                    shape="rounded"
                    color='white'
                    size='large'
                  />
                }

              </main>

              <Footer errorMsg={errorMsg} />

            </ThemeProvider>

          </div>
        </div>
      )
      }
    </>
  )
}

export default App
