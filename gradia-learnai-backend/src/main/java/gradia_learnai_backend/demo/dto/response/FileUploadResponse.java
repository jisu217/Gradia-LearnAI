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
    private Long id;
    private String fileName;
    private String originalFileName;
    private String fileType;
    private Long fileSize;
    private String textContent;
    private LocalDateTime createdAt;

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