// 메모 응답 DTO (MemoResponse.java)
// 서버가 클라이언트에게 학습 메모 정보를 반환할 때 사용하는 데이터 구조

package com.gradia.learnai.dto.response;

import com.gradia.learnai.entity.Memo;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemoResponse {
    
    // 메모 ID
    private Long id;
    
    // 메모가 속한 문서 ID
    private Long documentId;
    
    // 메모 제목
    private String title;
    
    // 메모 내용
    private String content;
    
    // 즐겨찾기 여부
    private Boolean isFavorite;
    
    // 메모 생성 시각
    private LocalDateTime createdAt;
    
    // 메모 마지막 수정 시각
    private LocalDateTime updatedAt;

    // Memo 엔티티 → DTO 변환 메서드
    public static MemoResponse from(Memo memo) {
        return MemoResponse.builder()
                .id(memo.getId())
                .documentId(memo.getDocument().getId())
                .title(memo.getTitle())
                .content(memo.getContent())
                .isFavorite(memo.getIsFavorite())
                .createdAt(memo.getCreatedAt())
                .updatedAt(memo.getUpdatedAt())
                .build();
    }
}
