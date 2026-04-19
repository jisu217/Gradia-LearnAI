package com.gradia.learnai.service;

import com.gradia.learnai.dto.MemoRequestDto;
import com.gradia.learnai.dto.MemoResponseDto;
import com.gradia.learnai.entity.LearningSession;
import com.gradia.learnai.entity.Memo;
import com.gradia.learnai.repository.LearningSessionRepository;
import com.gradia.learnai.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;
    private final LearningSessionRepository sessionRepository;

    public MemoResponseDto createMemo(MemoRequestDto dto) {
        LearningSession session = sessionRepository.findById(dto.getSessionId())
            .orElseThrow(() -> new RuntimeException("세션을 찾을 수 없습니다."));

        Memo memo = Memo.builder()
            .session(session)
            .content(dto.getContent())
            .build();

        return toDto(memoRepository.save(memo));
    }

    public List<MemoResponseDto> getMemosBySession(Long sessionId) {
        return memoRepository.findBySessionIdOrderByCreatedAtDesc(sessionId)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    public void deleteMemo(Long id) {
        memoRepository.deleteById(id);
    }

    private MemoResponseDto toDto(Memo m) {
        return MemoResponseDto.builder()
            .id(m.getId())
            .sessionId(m.getSession().getId())
            .content(m.getContent())
            .createdAt(m.getCreatedAt())
            .build();
    }
}