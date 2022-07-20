import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// import swAlert from '@sweetalert/with-react'
import Swal from 'sweetalert2'
import axios from 'axios';

function Listado(props) {

    let token = sessionStorage.getItem('token');
    const [moviesList, setMoviesList] = useState([]);

    document.body.style.backgroundImage = "none";

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=29bc496d5c1d99f91680cf698ed6785e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results);

            })
            .catch(error => {
                Swal.fire("Hubo un error, intenta más tarde")
            })

    }, [moviesList]);


    return (
        <>
            {/* para redireccionar cuando no hay token */}
            {!token && <Navigate to="/" />}
            <div className='row'>

                {moviesList.map((oneMovie, index) => (


                    <div className='col-3' key={oneMovie.id}>
                        <button
                            className='favourite-btn'
                            onClick={props.funFav}
                            data-movie-id={oneMovie.id}
                            id="buttonFav"
                        >
                            🖤
                        </button>

                        <>

                            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${oneMovie.poster_path}`} className="card-img-top mt-5" alt="..." />


                            <div className="card">
                                <div className="card-body card-movie">
                                    <h5 className="card-title">{oneMovie.title.substring(0, 30)}</h5>
                                    <p className="card-text">{oneMovie.overview.substring(0, 100)}</p>
                                    <Link to={`/Detalle?movieID=${oneMovie.id}`} className="btn btn-primary position-absolute top-75 start-25">Ver detalle</Link>
                                </div>
                            </div>

                        </>
                    </div>
                ))}
            </div>

        </>
    )

}

export default Listado;