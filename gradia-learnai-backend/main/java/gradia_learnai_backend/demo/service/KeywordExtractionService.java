// 키워드 추출 서비스 (KeywordExtractionService.java)
// 문서에서 키워드 추출, 정의/설명 생성, 즐겨찾기 토글 제공

package com.gradia.learnai.service;

import com.gradia.learnai.dto.response.KeywordResponse;
import com.gradia.learnai.entity.Document;
import com.gradia.learnai.entity.Keyword;
import com.gradia.learnai.exception.AnalysisException;
import com.gradia.learnai.repository.DocumentRepository;
import com.gradia.learnai.repository.KeywordRepository;
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
public class KeywordExtractionService {

    private final DocumentRepository documentRepository;
    private final KeywordRepository keywordRepository;

    // 키워드 추출
    @Transactional
    public List<KeywordResponse> extractKeywords(Long documentId, int limit) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new AnalysisException("문서를 찾을 수 없습니다."));

        String text = document.getTextContent();
        if (text == null || text.trim().isEmpty()) {
            throw new AnalysisException("텍스트 내용이 없습니다.");
        }

        // 단어별 점수 계산
        Map<String, Double> keywordScores = calculateKeywordScores(text);

        // 상위 N개 키워드 추출
        List<Map.Entry<String, Double>> topKeywords = keywordScores.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(limit)
                .collect(Collectors.toList());

        // 기존 키워드 삭제
        keywordRepository.deleteByDocumentId(documentId);

        // 키워드 엔티티 생성
        List<Keyword> keywords = new ArrayList<>();
        for (Map.Entry<String, Double> entry : topKeywords) {
            Keyword keyword = Keyword.builder()
                    .document(document)
                    .keyword(entry.getKey())
                    .score(entry.getValue())
                    .definition(generateDefinition(entry.getKey()))
                    .explanation(generateExplanation(entry.getKey(), text))
                    .build();
            keywords.add(keyword);
        }

        keywords = keywordRepository.saveAll(keywords);

        log.info("키워드 추출 완료: documentId={}, count={}", documentId, keywords.size());

        return keywords.stream()
                .map(KeywordResponse::from)
                .collect(Collectors.toList());
    }

    // 단어 빈도 기반 점수 계산
    private Map<String, Double> calculateKeywordScores(String text) {
        String[] words = text.toLowerCase()
                .replaceAll("[^a-zA-Z가-힣\\s]", " ")
                .split("\\s+");

        Map<String, Integer> wordFreq = new HashMap<>();
        for (String word : words) {
            if (word.length() > 2) { // 2글자 이하 단어 제외
                wordFreq.put(word, wordFreq.getOrDefault(word, 0) + 1);
            }
        }

        Map<String, Double> scores = new HashMap<>();
        int maxFreq = wordFreq.values().stream().max(Integer::compareTo).orElse(1);

        for (Map.Entry<String, Integer> entry : wordFreq.entrySet()) {
            double score = (double) entry.getValue() / maxFreq;
            scores.put(entry.getKey(), score);
        }

        return scores;
    }

    // 키워드 정의 생성
    private String generateDefinition(String keyword) {
        return keyword + "에 대한 정의입니다.";
    }

    // 키워드 설명 생성 (문맥 포함)
    private String generateExplanation(String keyword, String context) {
        int index = context.toLowerCase().indexOf(keyword.toLowerCase());
        if (index != -1) {
            int start = Math.max(0, index - 100);
            int end = Math.min(context.length(), index + keyword.length() + 100);
            return "..." + context.substring(start, end) + "...";
        }
        return keyword + "에 대한 설명입니다.";
    }

    // 문서의 모든 키워드 조회
    public List<KeywordResponse> getKeywords(Long documentId) {
        List<Keyword> keywords = keywordRepository.findByDocumentIdOrderByScoreDesc(documentId);
        return keywords.stream()
                .map(KeywordResponse::from)
                .collect(Collectors.toList());
    }

    // 키워드 즐겨찾기 토글
    @Transactional
    public KeywordResponse toggleFavorite(Long keywordId) {
        Keyword keyword = keywordRepository.findById(keywordId)
                .orElseThrow(() -> new AnalysisException("키워드를 찾을 수 없습니다."));

        keyword.setIsFavorite(!keyword.getIsFavorite());
        keyword = keywordRepository.save(keyword);

        log.info("키워드 즐겨찾기 토글: keywordId={}, isFavorite={}", 
                keywordId, keyword.getIsFavorite());

        return KeywordResponse.from(keyword);
    }
}
