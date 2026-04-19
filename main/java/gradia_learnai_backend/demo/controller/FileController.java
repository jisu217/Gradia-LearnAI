// 파일 컨트롤러 - 파일 업로드, 조회, 삭제 및 목록 관리 API

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

@Slf4j  // 로그 출력을 위한 Lombok 어노테이션
@RestController  // REST API 컨트롤러 선언
@RequestMapping("/api/files")  // 파일 관련 기본 경로 설정
@RequiredArgsConstructor  // 생성자 자동 주입
@Tag(name = "File", description = "파일 업로드 및 관리 API")  // Swagger 문서용 태그
public class FileController {

    private final FileService fileService; // 파일 관련 비즈니스 로직 서비스

    @PostMapping("/upload")
    @Operation(summary = "파일 업로드", description = "TXT, PDF 파일을 업로드하고 텍스트를 추출합니다.")
    public ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file) {
        
        log.info("파일 업로드 요청: {}", file.getOriginalFilename());
        
        FileUploadResponse response = fileService.uploadFile(file); // 파일 업로드 처리 및 텍스트 추출
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response); // 업로드 성공 시 201 반환
    }

    @GetMapping("/{documentId}")
    @Operation(summary = "문서 조회", description = "문서 ID로 문서 정보를 조회합니다.")
    public ResponseEntity<FileUploadResponse> getDocument(@PathVariable Long documentId) {
        
        log.info("문서 조회 요청: documentId={}", documentId);
        
        FileUploadResponse response = fileService.getDocument(documentId); // 특정 문서 조회
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{documentId}")
    @Operation(summary = "문서 삭제", description = "문서를 삭제합니다.")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long documentId) {
        
        log.info("문서 삭제 요청: documentId={}", documentId);
        
        fileService.deleteDocument(documentId); // 문서 삭제 처리
        
        return ResponseEntity.noContent().build(); // 204 No Content 반환
    }

    @GetMapping
    @Operation(summary = "전체 문서 목록 조회", description = "업로드된 모든 문서 목록을 조회합니다.")
    public ResponseEntity<List<FileUploadResponse>> getAllDocuments() {
        
        log.info("전체 문서 목록 조회 요청");
        
        List<FileUploadResponse> documents = fileService.getAllDocuments(); // 전체 문서 목록 조회
        
        return ResponseEntity.ok(documents);
    }
}
