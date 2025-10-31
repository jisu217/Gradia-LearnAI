package com.gradia.learnai.service;

import com.gradia.learnai.dto.request.MemoRequest;
import com.gradia.learnai.dto.request.ProgressRequest;
import com.gradia.learnai.dto.response.MemoResponse;
import com.gradia.learnai.dto.response.ProgressResponse;
import com.gradia.learnai.entity.Document;
import com.gradia.learnai.entity.LearningProgress;
import com.gradia.learnai.entity.Memo;
import com.gradia.learnai.exception.AnalysisException;
import com.gradia.learnai.repository.DocumentRepository;
import com.gradia.learnai.repository.LearningProgressRepository;
import com.gradia.learnai.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LearningService {

    private final DocumentRepository documentRepository;
    private final LearningProgressRepository progressRepository;
    private final MemoRepository memoRepository;

    @Transactional
    public ProgressResponse saveProgress(ProgressRequest request) {
        Document document = documentRepository.findById(request.getDocumentId())
                .orElseThrow(() -> new AnalysisException("문서를 찾을 수 없습니다."));

        LearningProgress progress = progressRepository.findByDocumentId(request.getDocumentId())
                .orElse(LearningProgress.builder()
                        .document(document)
                        .build());

        progress.setCurrentStep(request.getCurrentStep());
        progress.setTotalSteps(request.getTotalSteps());
        progress.setStepData(request.getStepData());
        progress.setIsCompleted(
            request.getIsCompleted() != null ? 
            request.getIsCompleted() : 
            request.getCurrentStep().equals(request.getTotalSteps())
        );

        progress = progressRepository.save(progress);

        log.info("학습 진도 저장: documentId={}, step={}/{}", 
                document.getId(), progress.getCurrentStep(), progress.getTotalSteps());

        return ProgressResponse.from(progress);
    }

    public ProgressResponse getProgress(Long documentId) {
        LearningProgress progress = progressRepository.findByDocumentId(documentId)
                .orElseThrow(() -> new AnalysisException("학습 진도를 찾을 수 없습니다."));

        return ProgressResponse.from(progress);
    }

    @Transactional
    public void deleteProgress(Long progressId) {
        LearningProgress progress = progressRepository.findById(progressId)
                .orElseThrow(() -> new AnalysisException("학습 진도를 찾을 수 없습니다."));

        progressRepository.delete(progress);

        log.info("학습 진도 삭제: progressId={}", progressId);
    }

    @Transactional
    public MemoResponse createMemo(MemoRequest request) {
        Document document = documentRepository.findById(request.getDocumentId())
                .orElseThrow(() -> new AnalysisException("문서를 찾을 수 없습니다."));

        Memo memo = Memo.builder()
                .document(document)
                .title(request.getTitle())
                .content(request.getContent())
                .isFavorite(request.getIsFavorite() != null ? request.getIsFavorite() : false)
                .build();

        memo = memoRepository.save(memo);

        log.info("메모 생성: documentId={}, memoId={}", document.getId(), memo.getId());

        return MemoResponse.from(memo);
    }

    public List<MemoResponse> getMemos(Long documentId) {
        List<Memo> memos = memoRepository.findByDocumentIdOrderByCreatedAtDesc(documentId);
        return memos.stream()
                .map(MemoResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public MemoResponse updateMemo(Long memoId, MemoRequest request) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new AnalysisException("메모를 찾을 수 없습니다."));

        memo.setTitle(request.getTitle());
        memo.setContent(request.getContent());
        if (request.getIsFavorite() != null) {
            memo.setIsFavorite(request.getIsFavorite());
        }

        memo = memoRepository.save(memo);

        log.info("메모 수정: memoId={}", memoId);

        return MemoResponse.from(memo);
    }

    @Transactional
    public void deleteMemo(Long memoId) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new AnalysisException("메모를 찾을 수 없습니다."));

        memoRepository.delete(memo);

        log.info("메모 삭제: memoId={}", memoId);
    }

    @Transactional
    public MemoResponse toggleMemoFavorite(Long memoId) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new AnalysisException("메모를 찾을 수 없습니다."));

        memo.setIsFavorite(!memo.getIsFavorite());
        memo = memoRepository.save(memo);

        log.info("메모 즐겨찾기 토글: memoId={}, isFavorite={}", memoId, memo.getIsFavorite());

        return MemoResponse.from(memo);
    }
}