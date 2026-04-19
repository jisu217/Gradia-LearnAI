package com.gradia.learnai.service;

import com.gradia.learnai.dto.SessionResponseDto;
import com.gradia.learnai.entity.LearningSession;
import com.gradia.learnai.repository.LearningSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LearningSessionService {

    private final LearningSessionRepository sessionRepository;
    private final FileService fileService;
    private final AiService aiService;

    public SessionResponseDto createSession(MultipartFile file) throws Exception {
        String text = fileService.extractText(file);
        String summary = aiService.summarize(text);
        String keywords = aiService.extractKeywords(text);

        LearningSession session = LearningSession.builder()
            .fileName(file.getOriginalFilename())
            .originalText(text)
            .summary(summary)
            .keywords(keywords)
            .build();

        LearningSession saved = sessionRepository.save(session);
        return toDto(saved);
    }

    public List<SessionResponseDto> getAllSessions() {
        return sessionRepository.findAllByOrderByCreatedAtDesc()
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    public SessionResponseDto getSession(Long id) {
        return toDto(sessionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("세션을 찾을 수 없습니다.")));
    }

    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }

    private SessionResponseDto toDto(LearningSession s) {
        return SessionResponseDto.builder()
            .id(s.getId())
            .fileName(s.getFileName())
            .summary(s.getSummary())
            .keywords(s.getKeywords())
            .definitions(s.getDefinitions())
            .createdAt(s.getCreatedAt())
            .build();
    }
}