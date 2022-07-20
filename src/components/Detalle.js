import { React, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Detalle() {
    const [movie, setMovie] = useState(null);
    let token = sessionStorage.getItem('token');
    let query = new URLSearchParams(window.location.search);
    //El indentificador es el movieID
    let movieID = query.get('movieID');

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=29bc496d5c1d99f91680cf698ed6785e&language=en-US`
        axios.get(endPoint)
            .then(response => {
                const movieData = response.data;
                setMovie(movieData)
            })
            .catch(error => {
                console.log(error);
            })

    }, [movieID])

    return (
        <>
            {!token && <Navigate to="/" />}
            {!movie && <p>Cargando...</p>}
            {movie &&
                <>
                    <h2>{movie.title}</h2>
                    <div className='row'>
                        <div className='col-4'>
                            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} className='img-fluid' alt="..." />

                        </div>
                        <div className='col-8'>
                            <h5>Fecha de estreno:</h5>
                            <p>{movie.release_date}</p>
                            <h5>Reseña:</h5>
                            <p>{movie.overview}</p>
                            <h5>Rating:</h5>
                            <p>{movie.vote_average}</p>
                            <h5>Géneros</h5>
                            <ul>
                                {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                            </ul>

                        </div>

                    </div>
                </>
            }
        </>
    )
}

export default Detalle;