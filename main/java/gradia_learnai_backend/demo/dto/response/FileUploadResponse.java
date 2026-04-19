// 파일 업로드 응답 DTO (FileUploadResponse.java)
// 서버가 클라이언트에게 업로드된 파일 정보를 반환할 때 사용하는 데이터 구조

package com.gradia.learnai.dto.response;

import com.gradia.learnai.entity.Document;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileUploadResponse {
    
    // 문서 ID
    private Long id;
    
    // 저장된 파일 이름
    private String fileName;
    
    // 원본 파일 이름
    private String originalFileName;
    
    // 파일 형식 (TXT, PDF 등)
    private String fileType;
    
    // 파일 크기 (바이트 단위)
    private Long fileSize;
    
    // 파일에서 추출된 텍스트 내용
    private String textContent;
    
    // 업로드 시각
    private LocalDateTime createdAt;

    // Document 엔티티 → DTO 변환 메서드
    public static FileUploadResponse from(Document document) {
        return FileUploadResponse.builder()
                .id(document.getId())
                .fileName(document.getFileName())
                .originalFileName(document.getOriginalFileName())
                .fileType(document.getFileType())
                .fileSize(document.getFileSize())
                .textContent(document.getTextContent())
                .createdAt(document.getCreatedAt())
                .build();
    }
}
