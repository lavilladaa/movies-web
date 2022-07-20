import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// import swAlert from '@sweetalert/with-react'
import Swal from 'sweetalert2'

function Resultados(props) {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');
    let token = sessionStorage.getItem('token');


    const [moviesResults, setMoviesResults] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=29bc496d5c1d99f91680cf698ed6785e&language=en-US&page=1&include_adult=false&query=${keyword}`;
        axios.get(endPoint)
            .then(response => {
                const moviesArray = response.data.results;
                if (moviesArray.length === 0) {
                    Swal.fire('Tu búsqueda no arrojó resultados');

                }
                setMoviesResults(moviesArray);

            })
            .catch(error => {
                console.log(error);
            })

    }, [keyword]);

    return (
        <>
            <h2>Resultados</h2>
            {!token && <Navigate to="/" />}
            {moviesResults.length === 0 && <h3>No hay resultados</h3>}
            <div className='row'>
                {moviesResults.map((oneMovie, i) => (
                    <div className='col-4 w-25' key={oneMovie.id}>
                        <button
                            className='favourite-btn fav-btn-mar'
                            onClick={props.funFav}
                            data-movie-id={oneMovie.id}
                        >
                            🖤
                        </button>
                        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${oneMovie.poster_path}`} className="card-img-top mt-3" alt="..." />
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{oneMovie.title.substring(0, 30)}</h5>
                                <p className="card-text">{oneMovie.overview.substring(0, 100)}</p>
                                <Link to={`/Detalle?movieID=${oneMovie.id}`} className="btn btn-primary">Ver detalle</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Resultados;