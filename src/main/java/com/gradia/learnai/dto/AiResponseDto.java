package com.gradia.learnai.dto;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class AiResponseDto {
    private String type;
    private String result;
}