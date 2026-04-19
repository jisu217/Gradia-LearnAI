package com.gradia.learnai.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class FileService {

    private static final long MAX_SIZE = 20 * 1024 * 1024; // 20MB
    private static final java.util.List<String> ALLOWED_TYPES = java.util.List.of(
        "text/plain", "application/pdf", "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    public String extractText(MultipartFile file) throws Exception {
        if (file.getSize() > MAX_SIZE) throw new IllegalArgumentException("파일 크기 초과 (최대 20MB)");
        String contentType = file.getContentType();
        if (!ALLOWED_TYPES.contains(contentType)) throw new IllegalArgumentException("지원하지 않는 파일 형식입니다.");

        // txt 파일의 경우 바로 읽기 (PDF는 추후 Apache PDFBox 추가 가능)
        return new String(file.getBytes(), StandardCharsets.UTF_8);
    }
}