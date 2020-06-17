import Axios from 'axios';

const CreateTask = props => new Promise((resolve, reject) => {

    let token = localStorage.getItem('auth-token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    Axios.post('http://dgt-back.herokuapp.com/api/tasks/create', props, config).then( resp =>{
        resolve(resp);

    }).catch(function(err){
        reject(err);
    });
});

const ListTasks = props => new Promise((resolve, reject) =>{
    let token = localStorage.getItem('auth-token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    Axios.get('http://dgt-back.herokuapp.com/api/tasks/', config).then( resp =>{
        resolve(resp);

    }).catch(function(err){
        reject(err);
    });
});

const DeleteTask = id => new Promise((resolve, reject) =>{
    let token = localStorage.getItem('auth-token');

    console.log(id);

    Axios.delete('http://dgt-back.herokuapp.com/api/tasks', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
          "_id":id
        }
      } ).then( resp =>{
        resolve(resp);

    }).catch(function(err){
        reject(err);
    });
});



export { CreateTask, ListTasks, DeleteTask};