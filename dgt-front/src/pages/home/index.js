import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import LogoutService from './../../services/logoutService.js';
import {CreateTask, ListTasks, DeleteTask} from './../../services/taskService.js';


const Home = () => {

        let history = useHistory();

        const [tasks, setTasks] = useState([]);
        const [listChanged, setListChanged] = useState(false);

        useEffect( () => {
            loadTasks();

        }, [listChanged]);

        const loadTasks = async function(){
            const response = await ListTasks();
            const data = response.data;
            console.log(data);
            setTasks(data);

            setListChanged(false);
        }

        const userLogout = async function() {
            let result = await LogoutService();
            console.log(result);
            history.push('/')
        };

        const createTask = async () => {
            let priority = document.getElementById('priority').value;
            let name = document.getElementById('name').value;
            
            const newTask = {
                "name":name,
                "priority":priority
            };
            
            let createResult = await CreateTask(newTask);
            setListChanged(true);

        };

        const handleDelete = async (id) => {
            const result = await DeleteTask(id);
            console.log(result);

            setListChanged(true);

        }

        return (
            <>
            <header>
            <h1>Eightnote</h1>
                <p onClick={() => {userLogout();}} id="logout">Logout</p>
            </header>

            <div>
                <ul id="myTasks">
        {tasks.map(task => <li key={task._id} ><p className="t-name">{task.name}</p><p className="t-priority">{task.priority}</p>{task._id} <button onClick={() => handleDelete(task._id)}>X</button></li>)}
                </ul>
            </div>

            <div id="actions">
            <input type="text" name="task-name" id="name" placeholder="exemplo: caminhar"/>
            <select id="priority" name="priority">
                <option value="alta">Prioridade alta</option>
                <option value="baixa">Prioridade Baixa</option>
            </select>
            <input type="button" value="Adicionar Tarefa" onClick={
                () => {
                    createTask();
                }
            }/>
            </div>
            </>
        );
    
};

export default Home;