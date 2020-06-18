import React from 'react';
import Logo from '../../assets/img/logo.png';
import './style.css';
import LoginService from '../../services/loginService.js';
import { useHistory } from "react-router-dom";

const Login = () =>{

    let history = useHistory();

    const userLogin = async function() {
        let email = document.getElementById('email').value.toLowerCase();
        let password = document.getElementById('password').value;
        let result;
        try{
            result = await LoginService({
                "email":email.toLowerCase(),
                "password":password
            
            });
        }catch(error){
            alert('Login ou senha incorretos: '+error);
        }
        
        if (result){
            history.push('/home');
        }

    };

    return(
        <>
        <div id="branding">
            <img src={Logo} alt="Eightnote logo" className="logo-img"/>
            <h1>Eightnote</h1>
            <p>Increase your produtivity 'eight'</p>
        </div>
        <div id="form-container">
        <form>
            <input type="email" placeholder="E-mail" id="email"/>
            <input type="password" placeholder="Password" id="password"/>
            <input type="button" id="default-btn" value="Login" onClick={userLogin}></input>
        </form>
        <p>Ainda não possui uma conta?</p>
        <span id="register" onClick={() => {
            history.push('/')}}>Registrar</span>
        </div>
        </>
    )
}

export default Login;