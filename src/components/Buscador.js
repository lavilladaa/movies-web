// import swAlert from '@sweetalert/with-react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function Buscador() {
    const navigate = useNavigate();
    let token = sessionStorage.getItem('token');
    const submitHandler = (e) => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        if (keyword.length === 0) {
            Swal.fire("Escribe por favor una palabra clave")
        } else if (keyword.length < 4) {
            Swal.fire("Escribe más de 4 caracteres")
        } else {
            e.currentTarget.keyword.value = '';
            navigate(`/Resultados?keyword=${keyword}`)
        }
    }

    return (
        <>
            {token ? (
                <form className="d-flex align-items-center" onSubmit={submitHandler}>
                    <label className='form label mb-0 mx-2'>
                        <input className="form-control" type="text" name="keyword" placeholder="Escribe una palabra clave..." />
                    </label>
                    <button className='btn btn-success' type="submit">Buscar</button>
                </form>) : <p className='display-6 m-0 text-light'>📽🎞</p>}
        </>
    )
}

export default Buscador;