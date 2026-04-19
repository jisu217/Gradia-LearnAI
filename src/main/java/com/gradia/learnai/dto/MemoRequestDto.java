package com.gradia.learnai.dto;

import lombok.Data;

@Data
public class MemoRequestDto {
    private Long sessionId;
    private String content;
}