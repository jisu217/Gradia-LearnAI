package com.gradia.learnai.dto;

import lombok.Data;

@Data
public class AiRequestDto {
    private String text;
    private String type; // "summary" | "keywords" | "definition" | "explanation"
    private String keyword; // definition/explanation 시 사용
}