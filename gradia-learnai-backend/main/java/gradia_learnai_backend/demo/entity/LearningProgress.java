// 학습 진도 엔티티 (LearningProgress.java)
// DB의 learning_progress 테이블과 매핑되며, 문서별 학습 진행 상황을 관리

package com.gradia.learnai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "learning_progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class LearningProgress {

    // 학습 진도 ID (PK, 자동 생성)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 학습 중인 문서 (ManyToOne, LAZY 로딩)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false)
    private Document document;

    // 현재 학습 단계
    @Column(nullable = false)
    private Integer currentStep;

    // 전체 학습 단계
    @Column(nullable = false)
    private Integer totalSteps;

    // 현재 단계에서 처리된 데이터 (예: 요약, 키워드 등)
    @Column(columnDefinition = "TEXT")
    private String stepData;

    // 학습 완료 여부 (기본 false)
    @Builder.Default
    private Boolean isCompleted = false;

    // 생성 시각 (자동 관리)
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // 마지막 수정 시각 (자동 관리)
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
