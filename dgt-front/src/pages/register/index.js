import React from 'react';
import Logo from '../../assets/img/logo.png';
import './style.css';
import RegisterService from '../../services/registerService.js';

const Register = () =>{
    return(
        <>
        <div id="branding">
            <img src={Logo} alt="Eightnote logo" class="logo-img"/>
            <h1>Eightnote</h1>
            <p>Increase your produtivity 'eight'</p>
        </div>
        <div id="form-container">
        <form>
            <input type="text" placeholder="Name" id="name"/>
            <input type="email" placeholder="E-mail" id="email"/>
            <input type="password" placeholder="Password" id="password"/>
            <input type="button" id="default-btn" value="Continuar" onClick={() => {
                let name = document.getElementById('name').value;
                let email = document.getElementById('email').value;
                let password = document.getElementById('password').value;

                RegisterService({
                    "name":name,
                    "email":email,
                    "password":password
                });
                
            }}></input>
        </form>
        <p>Já possui uma conta?</p>
        <a href="http://google.com">Entrar</a>
        </div>
        </>
    )
}

export default Register;