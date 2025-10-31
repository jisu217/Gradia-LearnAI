package com.gradia.learnai.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemoRequest {
    
    @NotNull(message = "문서 ID는 필수입니다.")
    private Long documentId;
    
    @NotBlank(message = "제목은 필수입니다.")
    @Size(max = 200, message = "제목은 200자를 초과할 수 없습니다.")
    private String title;
    
    @NotBlank(message = "내용은 필수입니다.")
    @Size(max = 5000, message = "내용은 5000자를 초과할 수 없습니다.")
    private String content;
    
    private Boolean isFavorite;
}