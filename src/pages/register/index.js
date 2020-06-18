import React from 'react';
import Logo from '../../assets/img/logo.png';
import './style.css';
import RegisterService from '../../services/registerService.js';
import { useHistory } from "react-router-dom";
import LoginService from '../../services/loginService.js';

const Register = () =>{

    useEffect(() => {
        document.title = 'Eightnote | Register';
    },[])

    let history = useHistory();

    const registerUser = async function() {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let result = await RegisterService({
            "name":name,
            "email":email.toLowerCase(),
            "password":password
        
        });

        if (result.data){
            let loginResult;
            loginResult = await LoginService({
                "email":email.toLowerCase(),
                "password":password
            });

            if (loginResult.data){
                history.push('/home');
            }
        }

    };

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
            <input type="button" id="default-btn" value="Continuar" onClick={registerUser}></input>
        </form>
        <p>Já possui uma conta?</p>
        <span id="login" href="#" onClick={() => {
            history.push('./login')
        }}>Entrar</span>
        </div>
        </>
    )
}

export default Register;