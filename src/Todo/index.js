import React, { useState, useEffect, useCallback } from 'react';
import List from './List';
import EditForm from './EditForm';
import AddForm from './AddForm';
import Modal from '../UI/Modal';
// import {useDispatch, useSelector} from "react-redux";
// import {modalActions} from '../store/modalSlice';
import axios from 'axios';

const Todo = (props) => {

    const [todos, setTodos] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [pendingTask, setPendingTask] = useState('');

    // const dispatch = useDispatch();

    // const isConfirmModalVisible = useSelector((state) => state.modal.isShown);

    const showModalHandler = () => {
        setShowEditModal(true);
      };

    const hideModalHandler = () => {
        setShowEditModal(false);
    };  

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
        showModalHandler();
      }

    // const editTask = (task, id) => {
    // setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
    // }  

    console.log(todos);

    const loadData = useCallback(async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/todos/')
            setTodos(res.data);
        }
        catch(error){
            console.log(error);
        }
    }, [])

    const pendingTasks = useCallback(async () => {
        axios.get('http://127.0.0.1:8000/api/count_pending_tasks/')
        .then(res => {
            const {count} = res.data;
    
            // totalCount.map(totalCount => {
            //   setValue({
            //     totalProducts: totalCount?.count,
            //   });
            // })
            setPendingTask(count);
        })
          .catch(err => {
          console.log(err);
      })
    }, [])

    useEffect(() => {
        loadData();
        pendingTasks();
    }, [loadData, pendingTasks])

    return (

        <div className='todo--wrapper'>
            <h1>Todo App</h1>
            <AddForm/> 
                <div className="todo__list-container">
                    {todos.map((todo) => (
                        todo.isEditing && showEditModal ? (
                            <Modal key={todo.id}><EditForm task={todo} hideModal={hideModalHandler} /></Modal>
                        ) : (
                            <List 
                                  key={todo.id} 
                                  todo={todo} 
                                  editTodo={editTodo}
                                  todos={todos}
                                />
                        )
                        
                    ))} 
                </div>
            <p>{pendingTask} pending tasks</p>    
        </div>
    )
}

export default Todo;