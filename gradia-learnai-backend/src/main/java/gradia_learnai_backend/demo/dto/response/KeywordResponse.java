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
    private Long id;
    private Long documentId;
    private String keyword;
    private String definition;
    private String explanation;
    private Double score;
    private Boolean isFavorite;
    private LocalDateTime createdAt;

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