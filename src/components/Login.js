import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
// import swAlert from '@sweetalert/with-react'
import Swal from 'sweetalert2'


function Login() {
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === '' || password === '') {
            Swal.fire("Los campos no pueden estar vacíos");
            return;

        }

        if (email !== '' && !regexEmail.test(email)) {
            Swal.fire(" Escribir una dirección de correo válida");
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            Swal.fire("Credenciales inválidas");
            return;
        }

        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                console.log(res.data);
                Swal.fire("Perfecto, ingresaste correctamente! ");
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                navigate('/Listado')

            })
            .catch(Swal.fire("error con la URL"))
    }
    let token = sessionStorage.getItem('token');
    return (
        <>
            {token && <Navigate to="/Listado" />}

            <div className='text-center p-3 position-absolute top-50 start-50 translate-middle lg-div'>
                <h2 className='text-bold'>Iniciar sesión</h2>
                <form onSubmit={submitHandler}>
                    <label className='form label d-block mt-2'>
                        <span>Correo electrónico</span>  <br />
                        <input type="email" name="email" />
                    </label>
                    <br />
                    <label className='form label d-block mt-2'>
                        <span>Contraseña</span>  <br />
                        <input type="password" name="password" />
                    </label>
                    <br />
                    <button type="submit">Ingresar</button>
                </form>
            </div>

        </>

    )
}

export default Login;