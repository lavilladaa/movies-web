import { Link } from 'react-router-dom';
import Buscador from './Buscador'

function Header(props) {
    let token = sessionStorage.getItem('token');
    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container'>

                    <span className='emoji-movie'> 🎥</span>
                    <Link className='navbar-brand' to='/'>AlkeFlix</Link>



                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/Listado'>Listado</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/Favoritos'>Favoritos</Link>
                            </li>
                            <li className='nav-item d-flex align-items-center'>
                                <span className='text-white-50'>
                                    {(props.favorites.length > 0 && token) &&
                                        <> ({props.favorites.length})</>
                                    }
                                </span>
                            </li>


                        </ul>
                    </div>
                    <Buscador />
                </div>
            </nav>
        </header >
    )
}

export default Header