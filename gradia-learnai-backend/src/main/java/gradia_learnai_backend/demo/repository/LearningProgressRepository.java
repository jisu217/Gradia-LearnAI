package com.gradia.learnai.repository;

import com.gradia.learnai.entity.LearningProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {
    Optional<LearningProgress> findByDocumentId(Long documentId);
    List<LearningProgress> findByDocumentIdOrderByUpdatedAtDesc(Long documentId);
    void deleteByDocumentId(Long documentId);
}