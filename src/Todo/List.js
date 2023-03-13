import React, {useState} from 'react';
import axios from 'axios';
import Modal from "../UI/Modal";

const List = (props) => {

    const {todo, editTodo, todos} = props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showModalHandler = () => {
      setShowDeleteModal(true);
    };

  const hideModalHandler = () => {
    setShowDeleteModal(false);
  };

  const todoDoneHandler = (e) => {
    e.preventDefault();
    const todoId = todo.id;
    axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}/`, {
            is_done: true
    })
    .then(res => {

        console.log(res);
        window.location.reload();
    })
    .catch((err) => {
        console.log(err);
    })
  }
  
  const deleteTodoHandler = () => {
    const todoId = todo.id;
    axios.delete(`http://127.0.0.1:8000/api/todos/${todoId}/`, {
        })
        .then(res => {

            console.log(res);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
  }

    return(
            <>
              <div className="todo-list">
                <p className={`${todo.is_done === true ? 'task--done' : ""}`}>{todo.name}</p>
                <div className='todo-btn--container'> 
                    <button className={`${todo.is_done === true ? 'hide-btn' : "btn--check"}`} onClick={todoDoneHandler}><i className="fas fa-check" id='btn--icon'></i></button>
                    <button className={`${todo.is_done === true ? 'hide-btn' : "btn--edit"}`} onClick={() => editTodo(todo.id)}><i className="fas fa-edit" id="btn--icon"></i></button>
                    <button className="btn--delete" onClick={showModalHandler}><i className="fas fa-trash" id="btn--icon"></i></button>
                </div>
              </div> 

              {showDeleteModal &&
                <Modal className='confirm--delete__modal'>
                  <div className="confirm__delete">
                    <h3>Delete</h3>
                    <p>Are you sure you want to delete this task?</p>
                    <div className="confirm__delete--btn">
                        <button className="btn--cancel" onClick={hideModalHandler}>Cancel</button>
                        <button className="confirm--btn-delete" onClick={deleteTodoHandler}>Delete</button>
                    </div>
                  </div>
                </Modal>
              }
              
            </>
    )
}

export default List;