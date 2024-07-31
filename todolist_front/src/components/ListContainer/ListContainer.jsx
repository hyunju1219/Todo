import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import api from '../../apis/instans';
import { getAdapter } from 'axios';
import ReactModal from 'react-modal';

function ListContainer({ todoList, getTodoList }) {

    const [ isModalOpen, setModalOpen ] = useState(false);

    const [ content, setContent ] = useState({
        todoId: "",
        content: ""
    });  

    const handleCheckChange = async (e) => {
        try {
            const response = await api.put(`/todo/${e.target.id}/status`);
            
        } catch (e) {
            console.error(e);
        }
        getTodoList();
      
    }

    const handleDeleteClick = async (e) => {
        const isDelete = window.confirm("삭제하시겠습니까?");
       
        if(isDelete){
            try {
                const response = await api.delete(`/todo/${e.target.name}`);
                console.log(response);
                getTodoList();
    
            } catch (e) {
                console.error(e);
            }
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleUpdateClick = (e) => {
        setModalOpen(true);
        setContent(todo => {
            return {
                ...todo,
                todoId: e.target.name
            }
        });
    }

    const handleCompleteClick = async () => {
        try {
            const response = await api.put("/todo", content);
            closeModal();
            getTodoList();
        } catch (error) {
            console.error(error);
        }
    } 

    const handleInputChange = (e) => {
        setContent(todo => {
            return {
                ...todo,
                content: e.target.value
            }
        });
    }
 
    return (
        <div>
            <ReactModal
                style={{
                    content: {
                        boxSizing: 'border-box',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%',
                        padding: '20px',
                        width: '300px',
                        height: '300px',
                        backgroundColor: '#fafafa',
                    }
                }}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <div css={s.modalLayout}>
                    <h2>ToDo 수정</h2>
                    <input type="text" name="content" value={content.content} onChange={handleInputChange}/>
                    <div>
                        <button onClick={handleCompleteClick}>완료</button>
                        <button onClick={() => closeModal()}>취소</button>
                    </div>
                </div>
            </ReactModal>
            <div css={s.container}>
                {
                    todoList.map(todo => 
                        <div key={todo.todoId} css={s.inputLayout}>
                            <h2></h2>
                            <input id={todo.todoId} type="checkbox" checked={todo.status === 1} onChange={handleCheckChange}  />
                            <label htmlFor={todo.todoId} type="text">{todo.content}</label>
                            <button name={todo.todoId} onClick={handleUpdateClick}>수정</button>
                            <button name={todo.todoId} onClick={handleDeleteClick}>삭제</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ListContainer;