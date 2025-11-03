// 메모 JPA 리포지토리 (MemoRepository.java)
// Memo 엔티티 데이터 접근 및 쿼리 메서드 정의

package com.gradia.learnai.repository;

import com.gradia.learnai.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Long> {

    // 문서 ID 기준 생성일 내림차순 메모 조회
    List<Memo> findByDocumentIdOrderByCreatedAtDesc(Long documentId);

    // 문서의 즐겨찾기된 메모 조회
    List<Memo> findByDocumentIdAndIsFavoriteTrue(Long documentId);

    // 문서에 속한 모든 메모 삭제
    void deleteByDocumentId(Long documentId);
}
