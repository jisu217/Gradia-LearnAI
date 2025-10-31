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
    private Long id;
    private Long documentId;
    private String title;
    private String content;
    private Boolean isFavorite;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

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