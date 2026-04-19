package com.gradia.learnai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {

    @Value("${ai.api.key}")
    private String apiKey;

    @Value("${ai.api.url}")
    private String apiUrl;

    @Value("${ai.api.model}")
    private String model;

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String callClaude(String prompt) throws Exception {
        Map<String, Object> body = Map.of(
            "model", model,
            "max_tokens", 1024,
            "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        RequestBody requestBody = RequestBody.create(
            objectMapper.writeValueAsString(body),
            MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
            .url(apiUrl)
            .post(requestBody)
            .addHeader("x-api-key", apiKey)
            .addHeader("anthropic-version", "2023-06-01")
            .addHeader("Content-Type", "application/json")
            .build();

        try (Response response = httpClient.newCall(request).execute()) {
            String responseBody = response.body().string();
            Map<?, ?> parsed = objectMapper.readValue(responseBody, Map.class);
            List<?> content = (List<?>) parsed.get("content");
            Map<?, ?> first = (Map<?, ?>) content.get(0);
            return (String) first.get("text");
        }
    }

    public String summarize(String text) throws Exception {
        String prompt = "다음 텍스트를 핵심 위주로 간결하게 요약해줘:\n\n" + text;
        return callClaude(prompt);
    }

    public String extractKeywords(String text) throws Exception {
        String prompt = "다음 텍스트에서 핵심 키워드 10개를 JSON 배열 형식으로만 반환해줘. 예: [\"키워드1\", \"키워드2\"]\n\n" + text;
        return callClaude(prompt);
    }

    public String define(String keyword) throws Exception {
        String prompt = "\"" + keyword + "\"의 뜻을 한국어로 2~3문장으로 간결하게 설명해줘.";
        return callClaude(prompt);
    }

    public String explain(String keyword) throws Exception {
        String prompt = "\"" + keyword + "\"에 대해 예시를 들어 쉽게 설명해줘.";
        return callClaude(prompt);
    }
}