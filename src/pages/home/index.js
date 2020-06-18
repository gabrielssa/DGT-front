import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import LogoutService from './../../services/logoutService.js';
import {CreateTask, ListTasks, DeleteTask, RenameTask} from './../../services/taskService.js';
import Trash from './img/trash.svg';
import Edit from './img/edit.svg';
import Loading from './img/loading.gif';

const Home = () => {

        let history = useHistory();

        const [tasks, setTasks] = useState([]);
        const [listChanged, setListChanged] = useState(false);
        const[addMode, setAddMode] = useState(false);
        const [order, setOrder] = useState('desc');
        const [loading, setLoading] = useState(false);

        useEffect(()=>{
            const loadingImg = document.getElementById('loading');
            if (loading){
                loadingImg.style.display = 'inline';
            }else{
                loadingImg.style.display = 'none';
            }
        },[loading])

        useEffect( () => {
            loadTasks();

        }, [listChanged]);

        useEffect( () => {
            if (addMode){
                document.getElementById('actions').style.display = 'block';
                document.getElementById('addTask').style.display = 'none';
                console.log('ativando addmode');
            }else{
                document.getElementById('actions').style.display = 'none';
                document.getElementById('addTask').style.display = 'block';
                
            }
        }, [addMode] );

        const loadTasks = async function(){
            setLoading(true);
            const response = await ListTasks(order);
            setLoading(false);

            const data = response.data;
            console.log(data);
            setTasks(data);
            if(data.length === 0){
                document.getElementById('h2').innerHTML = 'Sem Tarefas';
                document.getElementById('exb').style.display = 'none';
            }else{
                document.getElementById('h2').innerHTML = 'Suas tarefas';
                document.getElementById('exb').style.display = 'inline';
            }

            setListChanged(false);
        }

        const userLogout = async function() {
            setLoading(true);
            let result = await LogoutService();
            setLoading(false);
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
            
            setLoading(true);
            let createResult = await CreateTask(newTask);
            setLoading(false);
            setListChanged(true);

        };

        const handleDelete = async (id) => {
            setLoading(true);
            const result = await DeleteTask(id);
            setLoading(false);
            console.log(result);

            setListChanged(true);

        }

        const handleRename = async (id) => {
            const newName = window.prompt('Digite o novo nome para a tarefa');

            const props = {
                "_id":id,
                "name":newName
            };
            setLoading(true);
            const result = await RenameTask(props);
            setLoading(false);
            console.log(result);

            setListChanged(true);
        }

        const handleAddTool= () => {
            
            if (addMode){
                setAddMode(false);
                
            }else{
                setAddMode(true);
                document.getElementById('name').value = '';
            }
        }

        const handleChangeOrder = () => {
            if (order === 'asc'){
                setOrder('desc');
            }else{
                setOrder('asc');
            }
            setListChanged(true);
        }

        return (
            <>
            <header>
                <h1>Eightnote</h1>
                <p onClick={() => {userLogout();}} id="logout">Logout</p>
            </header>

            <div id="main">
                
                <h2 id="h2">Suas Atividades</h2>
                
                <p id="exb"> Exibição (<p onClick={handleChangeOrder} id="order">{order}</p>)</p>
                
                <img src={Loading} id="loading"/>

                <ul id="myTasks">
                    {tasks.map(task => 
                    <li key={task._id} >
                        <p className="t-name">{task.name}</p>
                        <p className="t-priority">{task.priority}</p>
                        <div id="buttons">
                            <img src={Trash} alt='Delete' id="img-trash" onClick={() => handleDelete(task._id)}></img>
                            <img src={Edit} alt='Edit' id="img-edit" onClick={() => handleRename(task._id)}></img>
                        </div>
                    </li>)}
                </ul>
            </div>

            <div id="addTask">
                <span id="plus">+</span><p onClick={handleAddTool}> Adicionar Tarefa</p>
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
                        handleAddTool();
                    }
                }/>
                <p id="cancel" onClick={handleAddTool}>Cancelar</p>
            </div>
            </>
        );
    
};

export default Home;