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

@Slf4j
@RestController
@RequestMapping("/api/analysis")
@RequiredArgsConstructor
@Tag(name = "Analysis", description = "텍스트 분석 API")
public class AnalysisController {

    private final KeywordExtractionService keywordExtractionService;
    private final SummarizationService summarizationService;

    @PostMapping("/keywords/{documentId}")
    @Operation(summary = "키워드 추출", description = "문서에서 핵심 키워드를 추출합니다.")
    public ResponseEntity<List<KeywordResponse>> extractKeywords(
            @PathVariable Long documentId,
            @RequestParam(defaultValue = "10") int limit) {
        
        log.info("키워드 추출 요청: documentId={}, limit={}", documentId, limit);
        
        List<KeywordResponse> keywords = keywordExtractionService.extractKeywords(documentId, limit);
        
        return ResponseEntity.ok(keywords);
    }

    @GetMapping("/keywords/{documentId}")
    @Operation(summary = "키워드 조회", description = "문서의 저장된 키워드를 조회합니다.")
    public ResponseEntity<List<KeywordResponse>> getKeywords(@PathVariable Long documentId) {
        
        log.info("키워드 조회 요청: documentId={}", documentId);
        
        List<KeywordResponse> keywords = keywordExtractionService.getKeywords(documentId);
        
        return ResponseEntity.ok(keywords);
    }

    @PutMapping("/keywords/{keywordId}/favorite")
    @Operation(summary = "키워드 즐겨찾기 토글", description = "키워드의 즐겨찾기 상태를 변경합니다.")
    public ResponseEntity<KeywordResponse> toggleKeywordFavorite(@PathVariable Long keywordId) {
        
        log.info("키워드 즐겨찾기 토글: keywordId={}", keywordId);
        
        KeywordResponse keyword = keywordExtractionService.toggleFavorite(keywordId);
        
        return ResponseEntity.ok(keyword);
    }

    @PostMapping("/summary/{documentId}")
    @Operation(summary = "문서 요약", description = "문서의 핵심 내용을 요약합니다.")
    public ResponseEntity<SummaryResponse> summarizeDocument(
            @PathVariable Long documentId,
            @RequestParam(defaultValue = "5") int sentenceCount) {
        
        log.info("문서 요약 요청: documentId={}, sentenceCount={}", documentId, sentenceCount);
        
        SummaryResponse summary = summarizationService.summarize(documentId, sentenceCount);
        
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/summary/{documentId}")
    @Operation(summary = "요약 조회", description = "문서의 저장된 요약을 조회합니다.")
    public ResponseEntity<SummaryResponse> getSummary(@PathVariable Long documentId) {
        
        log.info("요약 조회 요청: documentId={}", documentId);
        
        SummaryResponse summary = summarizationService.getSummary(documentId);
        
        return ResponseEntity.ok(summary);
    }
}