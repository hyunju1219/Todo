package com.toyproject.todolist.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReqUpdateTodoDto {
    private int todoId;
    private String content;
}
