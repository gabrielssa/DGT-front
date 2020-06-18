import Axios from 'axios';
import { useHistory} from 'react-router-dom';

const LoginService = props => new Promise((resolve, reject) => {

    console.log("---- As props sendo enviadas ----");
    console.log(props);
    console.log("resultado ----")
    Axios.post('https://dgt-back.herokuapp.com/api/user/login', props).then( resp =>{

        if (resp.data) {
            localStorage.setItem('auth-token', resp.data);
            resolve(resp);
        }

    }).catch(function(err){
        reject(err);
    });
});

export default LoginService;