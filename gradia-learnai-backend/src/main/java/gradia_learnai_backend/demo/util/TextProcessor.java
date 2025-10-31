package com.gradia.learnai.util;

import org.springframework.stereotype.Component;

@Component
public class TextProcessor {

    public String cleanText(String text) {
        if (text == null) {
            return "";
        }

        text = text.replaceAll("\\s+", " ");
        return text.trim();
    }

    public String[] splitSentences(String text) {
        return text.split("(?<=[.!?])\\s+");
    }

    public String[] splitWords(String text) {
        return text.toLowerCase()
                .replaceAll("[^a-zA-Z가-힣\\s]", " ")
                .split("\\s+");
    }

    public int countWords(String text) {
        if (text == null || text.trim().isEmpty()) {
            return 0;
        }
        return splitWords(text).length;
    }

    public int countSentences(String text) {
        if (text == null || text.trim().isEmpty()) {
            return 0;
        }
        return splitSentences(text).length;
    }
}