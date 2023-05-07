import React, {useState} from 'react'
import axios from 'axios';

const AddForm = () => {

    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://web-production-3ae5.up.railway.app/api/todos/', {
            name: value
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
        };

    return(
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
            <button type="submit" className='todo-btn'>Add Task</button>
        </form>
    )
    
}

export default AddForm;