package com.gradia.learnai.repository;

import com.gradia.learnai.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Long> {
    List<Memo> findByDocumentIdOrderByCreatedAtDesc(Long documentId);
    List<Memo> findByDocumentIdAndIsFavoriteTrue(Long documentId);
    void deleteByDocumentId(Long documentId);
}