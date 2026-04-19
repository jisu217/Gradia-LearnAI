package com.gradia.learnai.controller;

import com.gradia.learnai.dto.SessionResponseDto;
import com.gradia.learnai.service.LearningSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class LearningSessionController {

    private final LearningSessionService sessionService;

    @GetMapping
    public ResponseEntity<List<SessionResponseDto>> getAll() {
        return ResponseEntity.ok(sessionService.getAllSessions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionResponseDto> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(sessionService.getSession(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return ResponseEntity.noContent().build();
    }
}