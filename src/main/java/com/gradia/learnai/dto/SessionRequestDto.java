package com.gradia.learnai.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data @Builder
public class SessionResponseDto {
    private Long id;
    private String fileName;
    private String summary;
    private String keywords;
    private String definitions;
    private LocalDateTime createdAt;
}