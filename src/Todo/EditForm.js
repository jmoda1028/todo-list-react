import React, {useState} from 'react'
// import { modalActions } from '../store/modalSlice';
// import {useDispatch, useSelector} from "react-redux";
import exitBtn from '../Assets/images/exit.png';
import axios from 'axios';

const EditForm = (props) => {

    const {task, hideModal} = props;

    // const dispatch = useDispatch();

    const [value, setValue] = useState(task.name);

    console.log(value);

    // const hideModalHandler = () => {
    //     dispatch(modalActions.setModal(false));
    // }

    // const isModalVisible = useSelector((state) => state.modal.isShown);
    
    // console.log(isModalVisible);

    const handleUpdate = (todoId) => {
        axios.put(`http://127.0.0.1:8000/api/todos/${todoId}/`, {
            id: todoId,
            name: value,
        })
        .then(res => {
            console.log(res);
            
        })
        .catch((err) => {
            console.log(err);
        })
    }


    const handleSubmit = (e) => {
          e.preventDefault();
          handleUpdate(task.id);
        //   hideModal();
          window.location.reload();
    };

    return(
        <form onSubmit={handleSubmit} className="edit-todo--form">
             <div className='exit-btn'>
                <img src={exitBtn} alt="exit" onClick={hideModal}/>
            </div>
            <h3>Update Task</h3>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-update--input" placeholder='Update task' />
            <button type="submit" className='btn-todo__update'>Update</button>
        </form>
    )
}

export default EditForm;