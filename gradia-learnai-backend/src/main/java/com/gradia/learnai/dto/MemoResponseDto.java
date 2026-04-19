package com.gradia.learnai.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data @Builder
public class MemoResponseDto {
    private Long id;
    private Long sessionId;
    private String content;
    private LocalDateTime createdAt;
}