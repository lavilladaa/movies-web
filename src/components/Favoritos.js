
import { Navigate } from 'react-router-dom';
function Favoritos(props) {
    let token = sessionStorage.getItem('token');
    return (
        <>
            <h2>Sección de Favoritos </h2>
            {!token && <Navigate to="/" />}
            <div className='row'>
                {props.favorites.length === 0 && <div className='col-12 text-danger'>No tienes nada en favoritos</div>}
                {props.favorites.map((oneMovie, i) => (
                    <div className='col-3' key={oneMovie.id}>
                        <button
                            className='favourite-btn fav-btn-mar'
                            onClick={props.funFav}
                            data-movie-id={oneMovie.id}
                        >
                            ❤
                        </button>
                        <img src={oneMovie.imgURL} className="card-img-top mt-3" alt="..." />
                        <div className="card ">
                            <div className="card-body card-movie-fav">
                                <h5 className="card-title">{oneMovie.title.substring(0, 30)}</h5>
                                <p className="card-text">{oneMovie.overview.substring(0, 100)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Favoritos;