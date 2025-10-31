package com.gradia.learnai.controller;

import com.gradia.learnai.dto.request.MemoRequest;
import com.gradia.learnai.dto.request.ProgressRequest;
import com.gradia.learnai.dto.response.MemoResponse;
import com.gradia.learnai.dto.response.ProgressResponse;
import com.gradia.learnai.service.LearningService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/learning")
@RequiredArgsConstructor
@Tag(name = "Learning", description = "학습 진도 및 메모 관리 API")
public class LearningController {

    private final LearningService learningService;

    @PostMapping("/progress")
    @Operation(summary = "학습 진도 저장", description = "문서의 학습 진행 상황을 저장합니다.")
    public ResponseEntity<ProgressResponse> saveProgress(@Valid @RequestBody ProgressRequest request) {
        
        log.info("학습 진도 저장 요청: {}", request);
        
        ProgressResponse response = learningService.saveProgress(request);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/progress/{documentId}")
    @Operation(summary = "학습 진도 조회", description = "문서의 학습 진도를 조회합니다.")
    public ResponseEntity<ProgressResponse> getProgress(@PathVariable Long documentId) {
        
        log.info("학습 진도 조회 요청: documentId={}", documentId);
        
        ProgressResponse response = learningService.getProgress(documentId);
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/progress/{progressId}")
    @Operation(summary = "학습 진도 삭제", description = "학습 진도를 삭제합니다.")
    public ResponseEntity<Void> deleteProgress(@PathVariable Long progressId) {
        
        log.info("학습 진도 삭제 요청: progressId={}", progressId);
        
        learningService.deleteProgress(progressId);
        
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/memos")
    @Operation(summary = "메모 생성", description = "새로운 학습 메모를 생성합니다.")
    public ResponseEntity<MemoResponse> createMemo(@Valid @RequestBody MemoRequest request) {
        
        log.info("메모 생성 요청: {}", request);
        
        MemoResponse response = learningService.createMemo(request);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/memos/{documentId}")
    @Operation(summary = "메모 목록 조회", description = "문서의 모든 메모를 조회합니다.")
    public ResponseEntity<List<MemoResponse>> getMemos(@PathVariable Long documentId) {
        
        log.info("메모 목록 조회 요청: documentId={}", documentId);
        
        List<MemoResponse> memos = learningService.getMemos(documentId);
        
        return ResponseEntity.ok(memos);
    }

    @PutMapping("/memos/{memoId}")
    @Operation(summary = "메모 수정", description = "메모를 수정합니다.")
    public ResponseEntity<MemoResponse> updateMemo(
            @PathVariable Long memoId,
            @Valid @RequestBody MemoRequest request) {
        
        log.info("메모 수정 요청: memoId={}, request={}", memoId, request);
        
        MemoResponse response = learningService.updateMemo(memoId, request);
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/memos/{memoId}")
    @Operation(summary = "메모 삭제", description = "메모를 삭제합니다.")
    public ResponseEntity<Void> deleteMemo(@PathVariable Long memoId) {
        
        log.info("메모 삭제 요청: memoId={}", memoId);
        
        learningService.deleteMemo(memoId);
        
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/memos/{memoId}/favorite")
    @Operation(summary = "메모 즐겨찾기 토글", description = "메모의 즐겨찾기 상태를 변경합니다.")
    public ResponseEntity<MemoResponse> toggleMemoFavorite(@PathVariable Long memoId) {
        
        log.info("메모 즐겨찾기 토글: memoId={}", memoId);
        
        MemoResponse response = learningService.toggleMemoFavorite(memoId);
        
        return ResponseEntity.ok(response);
    }
}