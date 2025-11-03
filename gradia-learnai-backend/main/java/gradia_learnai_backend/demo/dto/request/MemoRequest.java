// 메모 요청 DTO (MemoRequest.java)
// 사용자가 문서 관련 메모를 작성하거나 수정할 때 전달하는 데이터 형식 정의

package com.gradia.learnai.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemoRequest {
    
    // 메모가 속한 문서의 ID (필수 입력)
    @NotNull(message = "문서 ID는 필수입니다.")
    private Long documentId;
    
    // 메모 제목 (필수, 최대 200자)
    @NotBlank(message = "제목은 필수입니다.")
    @Size(max = 200, message = "제목은 200자를 초과할 수 없습니다.")
    private String title;
    
    // 메모 내용 (필수, 최대 5000자)
    @NotBlank(message = "내용은 필수입니다.")
    @Size(max = 5000, message = "내용은 5000자를 초과할 수 없습니다.")
    private String content;
    
    // 즐겨찾기 여부 (선택)
    private Boolean isFavorite;
}
