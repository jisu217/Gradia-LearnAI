// 학습 진도 응답 DTO (ProgressResponse.java)
// 서버가 클라이언트에게 학습 진행 상황 정보를 반환할 때 사용하는 데이터 구조

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
    
    // 학습 진도 ID
    private Long id;
    
    // 학습 중인 문서 ID
    private Long documentId;
    
    // 현재 학습 단계
    private Integer currentStep;
    
    // 전체 학습 단계
    private Integer totalSteps;
    
    // 현재 단계에서 처리된 데이터 (예: 요약, 키워드 등)
    private String stepData;
    
    // 학습 완료 여부
    private Boolean isCompleted;
    
    // 학습 진도 생성 시각
    private LocalDateTime createdAt;
    
    // 학습 진도 마지막 수정 시각
    private LocalDateTime updatedAt;

    // LearningProgress 엔티티 → DTO 변환 메서드
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
