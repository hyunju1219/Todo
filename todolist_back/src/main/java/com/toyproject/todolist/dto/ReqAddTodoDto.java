package com.toyproject.todolist.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReqAddTodoDto {
    private String content;
    private int status;
    private String date;
}
