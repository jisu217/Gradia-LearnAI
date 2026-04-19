// 문서 요약 서비스 (SummarizationService.java)
// 문서의 텍스트 내용을 기반으로 추출적 요약 수행 및 요약 조회 제공

package com.gradia.learnai.service;

import com.gradia.learnai.dto.response.SummaryResponse;
import com.gradia.learnai.entity.Document;
import com.gradia.learnai.exception.AnalysisException;
import com.gradia.learnai.repository.DocumentRepository;
import com.gradia.learnai.util.TextProcessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SummarizationService {

    private final DocumentRepository documentRepository;
    private final TextProcessor textProcessor;

    // 문서 요약
    @Transactional
    public SummaryResponse summarize(Long documentId, int sentenceCount) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new AnalysisException("문서를 찾을 수 없습니다."));

        String text = document.getTextContent();
        if (text == null || text.trim().isEmpty()) {
            throw new AnalysisException("텍스트 내용이 없습니다.");
        }

        String[] sentences = textProcessor.splitSentences(text);
        
        if (sentences.length <= sentenceCount) {
            document.setSummary(text);
        } else {
            String summary = extractiveSummary(sentences, sentenceCount);
            document.setSummary(summary);
        }

        document = documentRepository.save(document);

        log.info("문서 요약 완료: documentId={}, sentenceCount={}", documentId, sentenceCount);
        return SummaryResponse.from(document, sentenceCount);
    }

    // 추출적 요약 (Extractive Summary)
    private String extractiveSummary(String[] sentences, int targetCount) {
        Map<Integer, Double> sentenceScores = new HashMap<>();
        
        for (int i = 0; i < sentences.length; i++) {
            double score = calculateSentenceScore(sentences[i]);
            sentenceScores.put(i, score);
        }

        List<Integer> topIndices = sentenceScores.entrySet().stream()
                .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                .limit(targetCount)
                .map(Map.Entry::getKey)
                .sorted()
                .collect(Collectors.toList());

        StringBuilder summary = new StringBuilder();
        for (int index : topIndices) {
            summary.append(sentences[index]).append(" ");
        }

        return summary.toString().trim();
    }

    // 문장 점수 계산 (현재는 단어 수 기반)
    private double calculateSentenceScore(String sentence) {
        String[] words = textProcessor.splitWords(sentence);
        return words.length;
    }

    // 요약 조회
    public SummaryResponse getSummary(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new AnalysisException("문서를 찾을 수 없습니다."));

        if (document.getSummary() == null) {
            throw new AnalysisException("생성된 요약이 없습니다.");
        }

        String[] sentences = textProcessor.splitSentences(document.getSummary());
        return SummaryResponse.from(document, sentences.length);
    }
}
