// 키워드 엔티티 (Keyword.java)
// DB의 keywords 테이블과 매핑되며, 문서별 핵심 키워드 정보를 관리

package com.gradia.learnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "keywords")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Keyword {

    // 키워드 ID (PK, 자동 생성)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 키워드가 속한 문서 (ManyToOne, LAZY 로딩)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false)
    private Document document;

    // 키워드 텍스트
    @Column(nullable = false)
    private String keyword;

    // 키워드 정의
    @Column(columnDefinition = "TEXT")
    private String definition;

    // 키워드 설명/부연 정보
    @Column(columnDefinition = "TEXT")
    private String explanation;

    // 키워드 점수 (예: 중요도)
    private Double score;

    // 즐겨찾기 여부 (기본 false)
    @Builder.Default
    private Boolean isFavorite = false;

    // 키워드 생성 시각 (자동 관리)
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
