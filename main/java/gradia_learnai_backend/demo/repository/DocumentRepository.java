// 문서 JPA 리포지토리 (DocumentRepository.java)
// Document 엔티티 데이터 접근 및 기본 CRUD 기능 제공

package com.gradia.learnai.repository;

import com.gradia.learnai.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    // 생성일 기준 내림차순으로 모든 문서 조회
    List<Document> findAllByOrderByCreatedAtDesc();
}
