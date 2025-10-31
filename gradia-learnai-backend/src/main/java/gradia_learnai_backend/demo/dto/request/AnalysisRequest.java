package com.gradia.learnai.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalysisRequest {
    
    @NotNull(message = "문서 ID는 필수입니다.")
    private Long documentId;
    
    @Min(value = 1, message = "최소 1개 이상의 키워드를 추출해야 합니다.")
    @Max(value = 50, message = "최대 50개까지 키워드를 추출할 수 있습니다.")
    private Integer keywordLimit;
    
    @Min(value = 1, message = "최소 1개 이상의 문장으로 요약해야 합니다.")
    @Max(value = 20, message = "최대 20개 문장까지 요약할 수 있습니다.")
    private Integer summaryLength;
}