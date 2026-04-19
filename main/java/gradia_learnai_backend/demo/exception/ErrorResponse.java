// 에러 응답 DTO (ErrorResponse.java)
// API 호출 시 예외 발생 시 클라이언트에 반환할 에러 정보 구조

package com.gradia.learnai.exception;

import lombok.*;
import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {

    // 에러 발생 시각
    private LocalDateTime timestamp;

    // HTTP 상태 코드 (예: 400, 404, 500)
    private int status;

    // 에러 종류/타입 (예: Bad Request, Not Found)
    private String error;

    // 상세 에러 메시지
    private String message;

    // 필드별 에러 세부 정보 (검증 실패 시 사용)
    private Map<String, String> details;
}
