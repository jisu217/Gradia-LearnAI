package com.gradia.learnai.repository;

import com.gradia.learnai.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    List<Keyword> findByDocumentIdOrderByScoreDesc(Long documentId);
    List<Keyword> findByDocumentIdAndIsFavoriteTrue(Long documentId);
    void deleteByDocumentId(Long documentId);
}