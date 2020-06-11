import React from 'react';
import Axios from 'axios';

const RegisterService = (props) =>{
    Axios.post('https://dgt-back.herokuapp.com/api/user/register/', props).then( resp =>{
        console.log(resp);

    }).catch(function(motivo){
        console.log(motivo);
    });
};

export default RegisterService;