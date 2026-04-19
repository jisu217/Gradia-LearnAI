package com.gradia.learnai.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "learning_sessions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LearningSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Column(columnDefinition = "TEXT")
    private String originalText;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String keywords;   // JSON 문자열로 저장

    @Column(columnDefinition = "TEXT")
    private String definitions; // JSON 문자열로 저장

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Memo> memos;

    @PrePersist
    protected void onCreate() { this.createdAt = LocalDateTime.now(); }
}