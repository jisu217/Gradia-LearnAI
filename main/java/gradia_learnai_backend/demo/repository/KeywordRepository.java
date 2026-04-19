// 키워드 JPA 리포지토리 (KeywordRepository.java)
// Keyword 엔티티 데이터 접근 및 쿼리 메서드 정의

package com.gradia.learnai.repository;

import com.gradia.learnai.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    // 문서 ID 기준 점수 내림차순 키워드 조회
    List<Keyword> findByDocumentIdOrderByScoreDesc(Long documentId);

    // 즐겨찾기된 키워드 조회
    List<Keyword> findByDocumentIdAndIsFavoriteTrue(Long documentId);

    // 문서에 속한 모든 키워드 삭제
    void deleteByDocumentId(Long documentId);
}
