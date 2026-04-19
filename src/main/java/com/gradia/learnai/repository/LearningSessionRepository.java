package com.gradia.learnai.repository;

import com.gradia.learnai.entity.LearningSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LearningSessionRepository extends JpaRepository<LearningSession, Long> {
    List<LearningSession> findAllByOrderByCreatedAtDesc();
}