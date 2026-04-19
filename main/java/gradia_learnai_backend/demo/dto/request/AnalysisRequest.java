// 분석 요청 DTO (AnalysisRequest.java)
// 사용자가 문서 분석 요청 시 전달하는 데이터 형식 정의

package com.gradia.learnai.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalysisRequest {
    
    // 분석할 문서의 ID (필수 입력)
    @NotNull(message = "문서 ID는 필수입니다.")
    private Long documentId;
    
    // 추출할 키워드 개수 (1~50개 제한)
    @Min(value = 1, message = "최소 1개 이상의 키워드를 추출해야 합니다.")
    @Max(value = 50, message = "최대 50개까지 키워드를 추출할 수 있습니다.")
    private Integer keywordLimit;
    
    // 요약 문장 개수 (1~20문장 제한)
    @Min(value = 1, message = "최소 1개 이상의 문장으로 요약해야 합니다.")
    @Max(value = 20, message = "최대 20개 문장까지 요약할 수 있습니다.")
    private Integer summaryLength;
}
