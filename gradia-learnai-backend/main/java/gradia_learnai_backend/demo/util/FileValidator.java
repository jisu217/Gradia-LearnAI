// 파일 검증 유틸리티 (FileValidator.java)
// 업로드 파일의 유효성 검사 수행: 비어있는지, 크기 제한, 허용 확장자 체크

package com.gradia.learnai.util;

import com.gradia.learnai.exception.FileProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
public class FileValidator {

    @Value("${file.allowed-extensions}") // application.properties에서 허용 확장자 정의 (예: pdf,txt)
    private String allowedExtensions;

    @Value("${file.max-size}") // 최대 업로드 크기 (바이트 단위)
    private long maxFileSize;

    // 파일 검증
    public void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new FileProcessingException("파일이 비어있습니다.");
        }

        if (file.getSize() > maxFileSize) {
            throw new FileProcessingException(
                String.format("파일 크기가 %dMB를 초과합니다.", maxFileSize / (1024 * 1024))
            );
        }

        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || !hasValidExtension(originalFileName)) {
            throw new FileProcessingException(
                String.format("허용되지 않은 파일 형식입니다. 허용 형식: %s", allowedExtensions)
            );
        }

        log.debug("파일 유효성 검증 통과: {}", originalFileName);
    }

    // 파일 확장자 체크
    private boolean hasValidExtension(String fileName) {
        List<String> extensions = Arrays.asList(allowedExtensions.split(","));
        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        return extensions.contains(fileExtension);
    }
}
