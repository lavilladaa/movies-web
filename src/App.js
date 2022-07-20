import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Listado from './components/Listado'
import Footer from './components/Footer';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
import { useState, useEffect } from 'react';
import './css/app.css';
import './css/bootstrap.min.css';


function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem('favs');
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }

  }, [])
  const funFav = (e) => {
    const favMovies = localStorage.getItem('favs');

    let tempMovieInFavs;
    if (favMovies === null) {
      tempMovieInFavs = [];

    } else {
      tempMovieInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }
    // El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.
    let movieIsInArray = tempMovieInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      tempMovieInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMovieInFavs));
      setFavorites(tempMovieInFavs);
    } else {
      let moviesLeft = tempMovieInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id;
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
    }
  }

  return (
    <>
      <Header favorites={favorites} />
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Listado' element={<Listado funFav={funFav} favorites={favorites} />} />
          <Route path='/Detalle' element={<Detalle />} />
          <Route path='/Resultados' element={<Resultados funFav={funFav} />} />
          <Route path='/Favoritos' element={<Favoritos funFav={funFav} favorites={favorites} />} />
        </Routes>
      </div>
      <Footer />

    </>
  );
}

export default App;
