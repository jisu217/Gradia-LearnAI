package com.gradia.learnai.repository;

import com.gradia.learnai.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    List<Memo> findBySessionIdOrderByCreatedAtDesc(Long sessionId);
}