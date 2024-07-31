import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import api from '../../apis/instans';
import { useRecoilState } from 'recoil';
import { dateStateAtom } from '../atoms/dateAtom';

function HeaderContainer({ getTodoList }) {

    const [ dateState, setDateState ] = useRecoilState(dateStateAtom);

    const [ todo, setTodo ] = useState({
        content: "",
        status: 0,
        date: ""
    });

    const handleInputChange = (e) => {
        let today = new Date();
        const year = today.getFullYear();
        const temp = today.getMonth() + 1
        const month = temp - 10 < 0 ? "0" + temp : temp;
        const date = today.getDate();
        console.log(year + "-" + month + "-" + date);
        setTodo(todo => {
            return {
                ...todo,
                [e.target.name]: e.target.value,
                date: year + "-" + month + "-" + date
            }
        })
    }
    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            handleAddClick();
        }
    }

    const handleAddClick = async () => {
        let responseData = null;
        try {
            responseData = await api.post("/todo", todo);
            console.log(responseData.data);
            getTodoList();
            setTodo({
                content: "",
                status: 0,
                date: ""
            })
        } catch (error) {
            console.error(error);
        }
       
    }

    const handleSearchClick = () => {
        getTodoList();
    }

    const handleDateChange = (e) => {
        setDateState(e.target.value);
    }

    return (
        <div>
            <div css={s.layout}>
                <h1>TODOLIST</h1>
                <div css={s.inputLayout}>
                    <input 
                        type="text" 
                        name="content" 
                        value={todo.content} 
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}/>
                    <button onClick={handleAddClick}>추가</button>
                </div>
                
                <div css={s.layout2}>
                    <div css={s.inputLayout}>
                        <input css={s.input} type="month" value={dateState} onChange={handleDateChange}/>
                        <button onClick={handleSearchClick}>조회</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderContainer;