// 문서 요약 응답 DTO (SummaryResponse.java)
// 서버가 클라이언트에게 문서 요약 정보를 반환할 때 사용하는 데이터 구조

package com.gradia.learnai.dto.response;

import com.gradia.learnai.entity.Document;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SummaryResponse {
    
    // 요약 대상 문서 ID
    private Long documentId;
    
    // 문서 요약 내용
    private String summary;
    
    // 요약 문장 수
    private Integer sentenceCount;
    
    // 요약 생성/수정 시각
    private LocalDateTime createdAt;

    // Document 엔티티 → DTO 변환 메서드
    public static SummaryResponse from(Document document, int sentenceCount) {
        return SummaryResponse.builder()
                .documentId(document.getId())
                .summary(document.getSummary())
                .sentenceCount(sentenceCount)
                .createdAt(document.getUpdatedAt())
                .build();
    }
}
