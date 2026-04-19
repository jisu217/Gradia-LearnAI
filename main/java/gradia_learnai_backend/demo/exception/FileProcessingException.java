// 파일 처리 예외 클래스 (FileProcessingException.java)
// 파일 업로드/처리 과정에서 발생하는 오류를 처리하기 위한 사용자 정의 런타임 예외

package com.gradia.learnai.exception;

public class FileProcessingException extends RuntimeException {
    
    // 메시지만 전달하는 생성자
    public FileProcessingException(String message) {
        super(message);
    }
    
    // 메시지와 원인 예외를 함께 전달하는 생성자
    public FileProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
