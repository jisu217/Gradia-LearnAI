// 텍스트 처리 유틸리티 (TextProcessor.java)
// 텍스트 정리, 문장/단어 분리, 개수 계산 등 기본 NLP 전처리 제공

package com.gradia.learnai.util;

import org.springframework.stereotype.Component;

@Component
public class TextProcessor {

    // 텍스트 공백 정리
    public String cleanText(String text) {
        if (text == null) {
            return "";
        }
        text = text.replaceAll("\\s+", " "); // 연속 공백을 단일 공백으로
        return text.trim();
    }

    // 문장 단위 분리 (마침표, 느낌표, 물음표 기준)
    public String[] splitSentences(String text) {
        if (text == null || text.trim().isEmpty()) {
            return new String[0];
        }
        return text.split("(?<=[.!?])\\s+");
    }

    // 단어 단위 분리 (영문 + 한글, 특수문자 제거)
    public String[] splitWords(String text) {
        if (text == null || text.trim().isEmpty()) {
            return new String[0];
        }
        return text.toLowerCase()
                .replaceAll("[^a-zA-Z가-힣\\s]", " ")
                .split("\\s+");
    }

    // 단어 개수 계산
    public int countWords(String text) {
        return splitWords(text).length;
    }

    // 문장 개수 계산
    public int countSentences(String text) {
        return splitSentences(text).length;
    }
}
