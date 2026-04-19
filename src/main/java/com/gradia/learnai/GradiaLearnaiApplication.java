package com.gradia.learnai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GradiaLearnaiApplication {
    public static void main(String[] args) {
        SpringApplication.run(GradiaLearnaiApplication.class, args);
    }
}

// MethodURL설명
// POST/api/files/upload파일 업로드 + AI 처리 + 세션 생성
// GET/api/sessions전체 학습 세션 조회
// GET/api/sessions/{id}특정 세션 조회
// DELETE/api/sessions/{id}세션 삭제
// POST/api/memos메모 생성
// GET/api/memos/session/{sessionId}세션별 메모 조회
// DELETE/api/memos/{id}메모 삭제
// POST/api/ai/processAI 직접 호출 (정의/설명 등)