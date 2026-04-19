// 학습 진행 상태 요청 DTO (ProgressRequest.java)
// 사용자의 문서 학습 진행 상황(단계, 완료 여부 등)을 서버에 전달하기 위한 데이터 구조

package com.gradia.learnai.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressRequest {
    
    // 학습이 진행 중인 문서의 ID (필수 입력)
    @NotNull(message = "문서 ID는 필수입니다.")
    private Long documentId;
    
    // 현재 학습 단계 (예: 0 = 시작, 1 = 키워드 보기 등)
    @NotNull(message = "현재 단계는 필수입니다.")
    @Min(value = 0, message = "현재 단계는 0 이상이어야 합니다.")
    private Integer currentStep;
    
    // 전체 학습 단계 수 (예: 총 3단계)
    @NotNull(message = "전체 단계는 필수입니다.")
    @Min(value = 1, message = "전체 단계는 1 이상이어야 합니다.")
    private Integer totalSteps;
    
    // 현재 단계에서 처리된 데이터 (예: 요약 내용, 키워드 등)
    private String stepData;
    
    // 학습 완료 여부 (true: 완료, false: 진행 중)
    private Boolean isCompleted;
}
