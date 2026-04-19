// 학습 진도 JPA 리포지토리 (LearningProgressRepository.java)
// LearningProgress 엔티티 데이터 접근 및 쿼리 메서드 정의

package com.gradia.learnai.repository;

import com.gradia.learnai.entity.LearningProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {

    // 문서 ID로 단일 학습 진도 조회
    Optional<LearningProgress> findByDocumentId(Long documentId);

    // 문서 ID 기준 최근 수정일 내림차순 학습 진도 조회
    List<LearningProgress> findByDocumentIdOrderByUpdatedAtDesc(Long documentId);

    // 문서에 속한 모든 학습 진도 삭제
    void deleteByDocumentId(Long documentId);
}
