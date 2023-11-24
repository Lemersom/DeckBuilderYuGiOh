import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@mui/material';


import '../App.css';

import QueryContext from '../QueryContext'

import Card from '../components/CardView.jsx';
import SearchView from '../components/SearchView.jsx';
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx';
import PopUp from '../components/PopUp.jsx'

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

function Home() {
  const [cards, setCards] = useState([]);
  const [maxCards, setMaxCards] = useState(0)
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("")
  const [errorMsg, setErrorMsg] = useState(false)
  const [hintMsg, setHintMsg] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [especificCard, setEspecificCard] = useState(-1)
  const [scrollToTop, setScrollToTop] = useState(false);
  const [logoClicked, setLogoClicked] = useState(0)

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
  
  const navigate = useNavigate();

  const callApi = () => {
    
    (async () => {
      const link = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${query}&num=20&offset=${(page - 1) * 20}`
      const resp = await fetch(link);
      const data = await resp.json();
      if (data.error) {
        setErrorMsg(true)
      }
      else {
        setErrorMsg(false)
        setCards(data.data)
        setMaxCards(data.meta.total_rows)       
      }
    })();
  };


  useEffect(() => {
    callApi();
    page === 1 ? setHintMsg(true) : setHintMsg(false)
  }, [page, especificCard]);

  useEffect(() => {
    setPage(1)
    callApi();
  }, [query]);

  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setScrollToTop(false);
    }
  }, [scrollToTop]);

  return (
    <>
      <div className="App">
        <ThemeProvider theme={theme}>

          {showModal && createPortal(
            <div className='popup-background' onClick={() => setShowModal(false)}>
                <PopUp
                  image={cards[especificCard]["card_images"][0].image_url}
                  sets={cards[especificCard]["card_sets"]}
              />
            </div>,
            document.body
          )}


          <Header onClickLogo={resetQuery}/>
          

          <main id="main">

                <QueryContext.Provider value={{ setQuery, errorMsg, hintMsg, logoClicked }}>
                <SearchView />
                </QueryContext.Provider>

            <Grid container spacing={4} align="center" className="main-card">

              {
                !errorMsg && cards.map((card, index) => (
                  <Card
                    image={card["card_images"][0].image_url_cropped}
                    name={card.name}
                    type={card.type}
                    onClick={() => showPopUp(index)}
                  />
                ))
              }

            </Grid>
            
            {!errorMsg  &&
              <Pagination
                count={Math.ceil(maxCards / 20)}
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

          <Footer errorMsg={errorMsg}/>

        </ThemeProvider>

      </div>
    </>
  )
}

export default Home
