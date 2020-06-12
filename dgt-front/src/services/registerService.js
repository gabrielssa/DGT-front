import React from 'react';
import Axios from 'axios';

const RegisterService = (props) =>{
    console.log("---- As props sendo enviadas ----");
    console.log(props);
    console.log("resultado ----")
    Axios.post('https://dgt-back.herokuapp.com/api/user/register', props).then( resp =>{
        console.log(resp);

    }).catch(function(motivo){
        console.log(motivo);
    });
};

export default RegisterService;