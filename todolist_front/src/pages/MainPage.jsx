/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import HeaderContainer from '../components/HeaderContainer/HeaderContainer';
import ListContainer from '../components/ListContainer/ListContainer';
import api from "../apis/instans";
import { dateStateAtom } from "../components/atoms/dateAtom";
import { useRecoilState } from "recoil";


function MainPage(props) {
    const [ dateState, setDateState ] = useRecoilState(dateStateAtom);

    const [ todoList, setTodoList ] = useState([]);

    useEffect(() => {
        getTodoList();
    }, [])
    
    const getTodoList = async () => {
        let responseDate = null;

        try {
            responseDate = await api.get(`/todolist/${dateState}`);
            console.log(responseDate.data);
            setTodoList(responseDate.data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div css={s.mainLayout}>
            <HeaderContainer getTodoList={getTodoList} />
            <div css={s.listlayout}>
                <ListContainer todoList={todoList} getTodoList={getTodoList}/>
                <ListContainer todoList={todoList.filter(todo => todo.status === 0)} getTodoList={getTodoList}/>
                <ListContainer todoList={todoList.filter(todo => todo.status === 1)} getTodoList={getTodoList}/>
            </div>
        </div>
    );
}

export default MainPage;