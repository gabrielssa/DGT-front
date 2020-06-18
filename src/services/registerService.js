import Axios from 'axios';

const RegisterService = props => new Promise((resolve, reject) => {
    console.log("---- As props sendo enviadas ----");
    console.log(props);
    console.log("resultado ----")

    
    Axios.post('https://dgt-back.herokuapp.com/api/user/register', props).then( resp =>{
        resolve(resp);

    }).catch(function(err){
        alert('Email já cadastrado ou serviço indisponível\nResposta do servidor: '+err);
        reject(err);
    });
    
});

export default RegisterService;