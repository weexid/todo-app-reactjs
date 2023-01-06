import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Form({ edit, setEdit, refetching }) {
    const [formVal, setFormVal] = useState('');
    const { isEdit, data } = edit;
    const [loading, setLoading] = useState(false);

    // re render when state edit (on parent) change
    useEffect(() => {
        if (isEdit) {
            setFormVal(data.todo);
        }

    }, [edit]);

    // cancel edit for reset state edit in parent
    const cancelEdit = () => {
        setFormVal("");
        setEdit({ isEdit: false, data: {} });
    }

    // function to add todo to the server
    const addToServer = () => {
        const data = { id: uuidv4(), todo: formVal, isComplete: false };
        axios.post(`https://6392cd1a11ed187986a138ae.mockapi.io/todo`, data).then(res => {
            // console.log(res.data);
            setFormVal('');
            refetching();
            setLoading(false);
        }).catch(err => console.error(err));


    }

    // function to edit to the server
    const editTodoToServer = (id) => {
        axios.put(`https://6392cd1a11ed187986a138ae.mockapi.io/todo/${id}`, { todo: formVal }).then(res => {
            setFormVal('');
            refetching();
            setEdit({ isEdit: false, data: {} });
            setLoading(false);
        }).catch(err => console.error(err));
    }

    // handling submit todo
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formVal !== "") {
            if (!isEdit) {
                setLoading(true);
                addToServer();
            }
            if (isEdit) {
                setLoading(true);
                editTodoToServer(data.id);
            }
        }
    }


    return (
        <div className='todo__form' >
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='d-flex justify-content-between align-items-center'>
                    <input disabled={loading ? true : false} value={formVal} type="text" name="todo" placeholder='Make something awesome' onChange={e => setFormVal(e.target.value)} />
                    <button type="submit"><i className='bx bx-chevrons-right'></i></button>

                    {isEdit && (<i style={{ fontSize: '1rem', cursor: 'pointer' }} className='bx bx-x text-danger' onClick={cancelEdit} ></i>)}
                </div>
            </form>
        </div>
    )
}

export default Form;
