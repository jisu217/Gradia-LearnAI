// 파일 서비스 (FileService.java)
// 파일 업로드, 텍스트 추출, 조회, 삭제 기능 제공

package com.gradia.learnai.service;

import com.gradia.learnai.dto.response.FileUploadResponse;
import com.gradia.learnai.entity.Document;
import com.gradia.learnai.exception.FileProcessingException;
import com.gradia.learnai.repository.DocumentRepository;
import com.gradia.learnai.util.FileValidator;
import com.gradia.learnai.util.PdfExtractor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FileService {

    private final DocumentRepository documentRepository; // 📄 문서 DB 접근
    private final FileValidator fileValidator;           // ✅ 파일 유효성 검증
    private final PdfExtractor pdfExtractor;             // 📄 PDF 텍스트 추출

    @Value("${file.upload-dir}")
    private String uploadDir; // 업로드 디렉토리 경로

    // 파일 업로드 및 DB 저장
    @Transactional
    public FileUploadResponse uploadFile(MultipartFile file) {
        fileValidator.validate(file); // 유효성 검증

        try {
            String savedFileName = saveFile(file);          // 파일 저장
            String filePath = uploadDir + "/" + savedFileName;
            String textContent = extractText(file, filePath); // 텍스트 추출

            Document document = Document.builder()
                    .fileName(savedFileName)
                    .originalFileName(file.getOriginalFilename())
                    .fileType(file.getContentType())
                    .fileSize(file.getSize())
                    .filePath(filePath)
                    .textContent(textContent)
                    .build();

            document = documentRepository.save(document); // DB 저장

            log.info("파일 업로드 완료: documentId={}, fileName={}", 
                    document.getId(), document.getOriginalFileName());

            return FileUploadResponse.from(document);

        } catch (IOException e) {
            log.error("파일 업로드 실패", e);
            throw new FileProcessingException("파일 업로드 중 오류가 발생했습니다.", e);
        }
    }

    // 실제 파일 저장
    private String saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath); // 디렉토리 없으면 생성
        }

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String savedFileName = UUID.randomUUID().toString() + extension; // 랜덤 파일명

        Path filePath = uploadPath.resolve(savedFileName);
        Files.copy(file.getInputStream(), filePath); // 파일 저장

        return savedFileName;
    }

    // 텍스트 추출 (PDF 또는 일반 텍스트)
    private String extractText(MultipartFile file, String filePath) throws IOException {
        String contentType = file.getContentType();

        if (contentType != null && contentType.equals("application/pdf")) {
            return pdfExtractor.extractText(filePath); // PDF 처리
        } else {
            return new String(file.getBytes(), StandardCharsets.UTF_8); // TXT 처리
        }
    }

    // 단일 문서 조회
    public FileUploadResponse getDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new FileProcessingException("문서를 찾을 수 없습니다."));
        return FileUploadResponse.from(document);
    }

    // 문서 삭제
    @Transactional
    public void deleteDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new FileProcessingException("문서를 찾을 수 없습니다."));

        try {
            Path filePath = Paths.get(document.getFilePath());
            Files.deleteIfExists(filePath); // 실제 파일 삭제
        } catch (IOException e) {
            log.warn("파일 삭제 실패: {}", document.getFilePath(), e);
        }

        documentRepository.delete(document); // DB 삭제
        log.info("문서 삭제 완료: documentId={}", documentId);
    }

    // 모든 문서 목록 조회 (생성일 내림차순)
    public List<FileUploadResponse> getAllDocuments() {
        return documentRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(FileUploadResponse::from)
                .collect(Collectors.toList());
    }
}
