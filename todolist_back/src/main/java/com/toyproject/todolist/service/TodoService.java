package com.toyproject.todolist.service;

import com.toyproject.todolist.dto.ReqAddTodoDto;
import com.toyproject.todolist.dto.ReqUpdateTodoDto;
import com.toyproject.todolist.dto.RespGetListDto;

import java.util.List;

public interface TodoService {
    int addTodo(ReqAddTodoDto reqAddTodoDto);
    List<RespGetListDto> getList(String findDate);
    int deleteTodo(int todoId);
    int updateTodoStatus(int todoId);
    int updateTodo(ReqUpdateTodoDto reqUpdateTodoDto);
}
