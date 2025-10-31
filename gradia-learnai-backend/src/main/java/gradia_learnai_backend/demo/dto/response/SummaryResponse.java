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
    private Long documentId;
    private String summary;
    private Integer sentenceCount;
    private LocalDateTime createdAt;

    public static SummaryResponse from(Document document, int sentenceCount) {
        return SummaryResponse.builder()
                .documentId(document.getId())
                .summary(document.getSummary())
                .sentenceCount(sentenceCount)
                .createdAt(document.getUpdatedAt())
                .build();
    }
}