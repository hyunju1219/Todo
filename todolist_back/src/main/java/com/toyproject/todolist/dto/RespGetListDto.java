package com.toyproject.todolist.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RespGetListDto {
    private int todoId;
    private String content;
    private int status;
}
