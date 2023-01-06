import React from 'react';
import { Tooltip, TooltipWrapper } from 'react-tooltip';
import axios from 'axios';

function List({ check, todos, refetching, edit, setEdit }) {
    const { id, todo, isComplete } = todos;

    const handleClickCheck = () => {
        if (isComplete) {
            // update todo isComplete ke false
            axios.put(`https://6392cd1a11ed187986a138ae.mockapi.io/todo/${id}`, { isComplete: !isComplete }).then(res => {
                // console.log(res.data)
                refetching();
            }).catch(e => console.error(e.response.code));
        }

        if (!isComplete) {
            //update todo isComplete ke true
            axios.put(`https://6392cd1a11ed187986a138ae.mockapi.io/todo/${id}`, { isComplete: !isComplete }).then(res => {
                // console.log(res.data)
                refetching()
            }).catch(e => {
                console.error(e);
            });

        }
    }

    const handleClickDelete = () => {
        const confirm = window.confirm("Are you sure delete this todo ?");
        if (confirm) {
            axios.delete(`https://6392cd1a11ed187986a138ae.mockapi.io/todo/${id}`).then(res => {
                // console.log(res.data)
                refetching();
            }).catch(err => console.error(err));
        } else {
            console.log('delete canceled');
        }

    }

    const handleClickEdit = () => {
        setEdit({ ...edit, isEdit: true, data: todos });
    }

    if (check) {
        return (
            <div className='todo__list d-flex justify-content-between align-items-center'>
                <div className='todo__checklist_icon'>
                    <i onClick={handleClickCheck} className='bx bx-check icon_checked'></i>
                </div>

                <div className='todo_text checked_text' >
                    <span> {todo}</span>
                </div>

                <div className='todo__delete_icon'>
                    <i onClick={handleClickDelete} className='bx bx-x'></i>
                </div>
            </div>
        )
    }

    if (!check) {
        return (
            <div className='todo__list d-flex justify-content-between align-items-center'>
                <div className='todo__checklist_icon'>
                    <i onClick={handleClickCheck} className='bx bx-check'></i>
                </div>
                <div className='todo_text uncheck_text' >
                    <TooltipWrapper tooltipId='edit_tooltip' delayShow={1000}>
                        <span onClick={handleClickEdit}> {todo}</span>
                    </TooltipWrapper>
                </div>
                <div className='todo__delete_icon'>
                    <i onClick={handleClickDelete} className='bx bx-x'></i>
                </div>

                <Tooltip id='edit_tooltip' content='Click to edit' className='custom-toolkit' />
            </div>
        )
    }
}

export default List
