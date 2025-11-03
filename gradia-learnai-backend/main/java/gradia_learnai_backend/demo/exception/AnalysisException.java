// 분석 예외 클래스 (AnalysisException.java)
// 텍스트 분석 관련 오류 발생 시 사용되는 사용자 정의 런타임 예외

package com.gradia.learnai.exception;

public class AnalysisException extends RuntimeException {
    
    // 메시지만 전달하는 생성자
    public AnalysisException(String message) {
        super(message);
    }
    
    // 메시지와 원인 예외를 함께 전달하는 생성자
    public AnalysisException(String message, Throwable cause) {
        super(message, cause);
    }
}
