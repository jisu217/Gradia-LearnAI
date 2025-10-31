package com.gradia.learnai.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressRequest {
    
    @NotNull(message = "문서 ID는 필수입니다.")
    private Long documentId;
    
    @NotNull(message = "현재 단계는 필수입니다.")
    @Min(value = 0, message = "현재 단계는 0 이상이어야 합니다.")
    private Integer currentStep;
    
    @NotNull(message = "전체 단계는 필수입니다.")
    @Min(value = 1, message = "전체 단계는 1 이상이어야 합니다.")
    private Integer totalSteps;
    
    private String stepData;
    
    private Boolean isCompleted;
}