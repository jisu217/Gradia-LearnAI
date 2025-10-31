package com.gradia.learnai.dto.response;

import com.gradia.learnai.entity.LearningProgress;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressResponse {
    private Long id;
    private Long documentId;
    private Integer currentStep;
    private Integer totalSteps;
    private String stepData;
    private Boolean isCompleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ProgressResponse from(LearningProgress progress) {
        return ProgressResponse.builder()
                .id(progress.getId())
                .documentId(progress.getDocument().getId())
                .currentStep(progress.getCurrentStep())
                .totalSteps(progress.getTotalSteps())
                .stepData(progress.getStepData())
                .isCompleted(progress.getIsCompleted())
                .createdAt(progress.getCreatedAt())
                .updatedAt(progress.getUpdatedAt())
                .build();
    }
}