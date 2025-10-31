package com.gradia.learnai.controller;

import com.gradia.learnai.dto.response.FileUploadResponse;
import com.gradia.learnai.service.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
@Tag(name = "File", description = "파일 업로드 및 관리 API")
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    @Operation(summary = "파일 업로드", description = "TXT, PDF 파일을 업로드하고 텍스트를 추출합니다.")
    public ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file) {
        
        log.info("파일 업로드 요청: {}", file.getOriginalFilename());
        
        FileUploadResponse response = fileService.uploadFile(file);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{documentId}")
    @Operation(summary = "문서 조회", description = "문서 ID로 문서 정보를 조회합니다.")
    public ResponseEntity<FileUploadResponse> getDocument(@PathVariable Long documentId) {
        
        log.info("문서 조회 요청: documentId={}", documentId);
        
        FileUploadResponse response = fileService.getDocument(documentId);
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{documentId}")
    @Operation(summary = "문서 삭제", description = "문서를 삭제합니다.")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long documentId) {
        
        log.info("문서 삭제 요청: documentId={}", documentId);
        
        fileService.deleteDocument(documentId);
        
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @Operation(summary = "전체 문서 목록 조회", description = "업로드된 모든 문서 목록을 조회합니다.")
    public ResponseEntity<List<FileUploadResponse>> getAllDocuments() {
        
        log.info("전체 문서 목록 조회 요청");
        
        List<FileUploadResponse> documents = fileService.getAllDocuments();
        
        return ResponseEntity.ok(documents);
    }
}