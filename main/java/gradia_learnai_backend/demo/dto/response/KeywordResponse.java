// 키워드 응답 DTO (KeywordResponse.java)
// 서버가 클라이언트에게 문서 키워드 정보를 반환할 때 사용하는 데이터 구조

package com.gradia.learnai.dto.response;

import com.gradia.learnai.entity.Keyword;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KeywordResponse {
    
    // 키워드 ID
    private Long id;
    
    // 키워드가 속한 문서 ID
    private Long documentId;
    
    // 키워드 텍스트
    private String keyword;
    
    // 키워드 정의
    private String definition;
    
    // 키워드 설명/부연 정보
    private String explanation;
    
    // 키워드 점수 (예: 중요도)
    private Double score;
    
    // 즐겨찾기 여부
    private Boolean isFavorite;
    
    // 키워드 생성 시각
    private LocalDateTime createdAt;

    // Keyword 엔티티 → DTO 변환 메서드
    public static KeywordResponse from(Keyword keyword) {
        return KeywordResponse.builder()
                .id(keyword.getId())
                .documentId(keyword.getDocument().getId())
                .keyword(keyword.getKeyword())
                .definition(keyword.getDefinition())
                .explanation(keyword.getExplanation())
                .score(keyword.getScore())
                .isFavorite(keyword.getIsFavorite())
                .createdAt(keyword.getCreatedAt())
                .build();
    }
}
