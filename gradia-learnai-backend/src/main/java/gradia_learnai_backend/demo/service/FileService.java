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

    private final DocumentRepository documentRepository;
    private final FileValidator fileValidator;
    private final PdfExtractor pdfExtractor;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Transactional
    public FileUploadResponse uploadFile(MultipartFile file) {
        fileValidator.validate(file);

        try {
            String savedFileName = saveFile(file);
            String filePath = uploadDir + "/" + savedFileName;
            String textContent = extractText(file, filePath);

            Document document = Document.builder()
                    .fileName(savedFileName)
                    .originalFileName(file.getOriginalFilename())
                    .fileType(file.getContentType())
                    .fileSize(file.getSize())
                    .filePath(filePath)
                    .textContent(textContent)
                    .build();

            document = documentRepository.save(document);

            log.info("파일 업로드 완료: documentId={}, fileName={}", 
                    document.getId(), document.getOriginalFileName());

            return FileUploadResponse.from(document);

        } catch (IOException e) {
            log.error("파일 업로드 실패", e);
            throw new FileProcessingException("파일 업로드 중 오류가 발생했습니다.", e);
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String savedFileName = UUID.randomUUID().toString() + extension;

        Path filePath = uploadPath.resolve(savedFileName);
        Files.copy(file.getInputStream(), filePath);

        return savedFileName;
    }

    private String extractText(MultipartFile file, String filePath) throws IOException {
        String contentType = file.getContentType();

        if (contentType != null && contentType.equals("application/pdf")) {
            return pdfExtractor.extractText(filePath);
        } else {
            return new String(file.getBytes(), StandardCharsets.UTF_8);
        }
    }

    public FileUploadResponse getDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new FileProcessingException("문서를 찾을 수 없습니다."));

        return FileUploadResponse.from(document);
    }

    @Transactional
    public void deleteDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new FileProcessingException("문서를 찾을 수 없습니다."));

        try {
            Path filePath = Paths.get(document.getFilePath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            log.warn("파일 삭제 실패: {}", document.getFilePath(), e);
        }

        documentRepository.delete(document);

        log.info("문서 삭제 완료: documentId={}", documentId);
    }

    public List<FileUploadResponse> getAllDocuments() {
        return documentRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(FileUploadResponse::from)
                .collect(Collectors.toList());
    }
}