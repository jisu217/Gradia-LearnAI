// 텍스트 분석 컨트롤러 - 키워드 추출 및 문서 요약 관련 API 처리

package com.gradia.learnai.controller;

import com.gradia.learnai.dto.response.KeywordResponse;
import com.gradia.learnai.dto.response.SummaryResponse;
import com.gradia.learnai.service.KeywordExtractionService;
import com.gradia.learnai.service.SummarizationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j  // 로그 출력을 위한 Lombok 어노테이션
@RestController  // REST API 컨트롤러 선언
@RequestMapping("/api/analysis")  // 기본 URL 경로 설정
@RequiredArgsConstructor  // 생성자 주입 자동 생성
@Tag(name = "Analysis", description = "텍스트 분석 API")  // Swagger 문서용 태그
public class AnalysisController {

    private final KeywordExtractionService keywordExtractionService;  // 키워드 추출 서비스
    private final SummarizationService summarizationService;          // 요약 서비스

    @PostMapping("/keywords/{documentId}")
    @Operation(summary = "키워드 추출", description = "문서에서 핵심 키워드를 추출합니다.")
    public ResponseEntity<List<KeywordResponse>> extractKeywords(
            @PathVariable Long documentId,
            @RequestParam(defaultValue = "10") int limit) {
        
        log.info("키워드 추출 요청: documentId={}, limit={}", documentId, limit);
        
        List<KeywordResponse> keywords = keywordExtractionService.extractKeywords(documentId, limit); // 키워드 추출 실행
        
        return ResponseEntity.ok(keywords); // 결과 반환
    }

    @GetMapping("/keywords/{documentId}")
    @Operation(summary = "키워드 조회", description = "문서의 저장된 키워드를 조회합니다.")
    public ResponseEntity<List<KeywordResponse>> getKeywords(@PathVariable Long documentId) {
        
        log.info("키워드 조회 요청: documentId={}", documentId);
        
        List<KeywordResponse> keywords = keywordExtractionService.getKeywords(documentId); // 저장된 키워드 조회
        
        return ResponseEntity.ok(keywords);
    }

    @PutMapping("/keywords/{keywordId}/favorite")
    @Operation(summary = "키워드 즐겨찾기 토글", description = "키워드의 즐겨찾기 상태를 변경합니다.")
    public ResponseEntity<KeywordResponse> toggleKeywordFavorite(@PathVariable Long keywordId) {
        
        log.info("키워드 즐겨찾기 토글: keywordId={}", keywordId);
        
        KeywordResponse keyword = keywordExtractionService.toggleFavorite(keywordId); // 즐겨찾기 상태 변경
        
        return ResponseEntity.ok(keyword);
    }

    @PostMapping("/summary/{documentId}")
    @Operation(summary = "문서 요약", description = "문서의 핵심 내용을 요약합니다.")
    public ResponseEntity<SummaryResponse> summarizeDocument(
            @PathVariable Long documentId,
            @RequestParam(defaultValue = "5") int sentenceCount) {
        
        log.info("문서 요약 요청: documentId={}, sentenceCount={}", documentId, sentenceCount);
        
        SummaryResponse summary = summarizationService.summarize(documentId, sentenceCount); // 문서 요약 수행
        
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/summary/{documentId}")
    @Operation(summary = "요약 조회", description = "문서의 저장된 요약을 조회합니다.")
    public ResponseEntity<SummaryResponse> getSummary(@PathVariable Long documentId) {
        
        log.info("요약 조회 요청: documentId={}", documentId);
        
        SummaryResponse summary = summarizationService.getSummary(documentId); // 저장된 요약 조회
        
        return ResponseEntity.ok(summary);
    }
}
