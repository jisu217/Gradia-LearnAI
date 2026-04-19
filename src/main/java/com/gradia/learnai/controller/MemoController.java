package com.gradia.learnai.controller;

import com.gradia.learnai.dto.MemoRequestDto;
import com.gradia.learnai.dto.MemoResponseDto;
import com.gradia.learnai.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memos")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;

    @PostMapping
    public ResponseEntity<MemoResponseDto> create(@RequestBody MemoRequestDto dto) {
        return ResponseEntity.ok(memoService.createMemo(dto));
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<MemoResponseDto>> getBySession(@PathVariable Long sessionId) {
        return ResponseEntity.ok(memoService.getMemosBySession(sessionId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        memoService.deleteMemo(id);
        return ResponseEntity.noContent().build();
    }
}