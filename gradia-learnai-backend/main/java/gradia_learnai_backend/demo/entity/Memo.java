// 메모 엔티티 (Memo.java)
// DB의 memos 테이블과 매핑되며, 문서별 학습 메모 정보를 관리

package com.gradia.learnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "memos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Memo {

    // 메모 ID (PK, 자동 생성)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 메모가 속한 문서 (ManyToOne, LAZY 로딩)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false)
    private Document document;

    // 메모 제목
    @Column(nullable = false)
    private String title;

    // 메모 내용
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    // 즐겨찾기 여부 (기본 false)
    @Builder.Default
    private Boolean isFavorite = false;

    // 메모 생성 시각 (자동 관리)
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // 메모 마지막 수정 시각 (자동 관리)
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
