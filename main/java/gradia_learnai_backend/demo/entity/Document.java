// 문서 엔티티 (Document.java)
// DB의 documents 테이블과 매핑되며, 업로드된 파일, 텍스트, 요약, 키워드, 학습 진도, 메모 정보를 관리

package com.gradia.learnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Document {

    // 문서 ID (PK, 자동 생성)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 저장된 파일 이름
    @Column(nullable = false)
    private String fileName;

    // 원본 파일 이름
    @Column(nullable = false)
    private String originalFileName;

    // 파일 형식 (TXT, PDF 등)
    @Column(nullable = false)
    private String fileType;

    // 파일 크기 (바이트)
    @Column(nullable = false)
    private Long fileSize;

    // 서버 내 파일 경로
    @Column(nullable = false)
    private String filePath;

    // 파일에서 추출된 텍스트 내용
    @Column(columnDefinition = "LONGTEXT")
    private String textContent;

    // 문서 요약
    @Column(columnDefinition = "TEXT")
    private String summary;

    // 문서에 속한 키워드 목록
    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Keyword> keywords = new ArrayList<>();

    // 문서 학습 진도 목록
    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<LearningProgress> learningProgresses = new ArrayList<>();

    // 문서 관련 메모 목록
    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Memo> memos = new ArrayList<>();

    // 생성 시각 (자동 관리)
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // 마지막 수정 시각 (자동 관리)
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // 양방향 연관관계 편의 메서드
    public void addKeyword(Keyword keyword) {
        keywords.add(keyword);
        keyword.setDocument(this);
    }

    public void addLearningProgress(LearningProgress progress) {
        learningProgresses.add(progress);
        progress.setDocument(this);
    }

    public void addMemo(Memo memo) {
        memos.add(memo);
        memo.setDocument(this);
    }
}
