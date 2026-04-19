package com.gradia.learnai.controller;

import com.gradia.learnai.dto.SessionResponseDto;
import com.gradia.learnai.service.LearningSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final LearningSessionService sessionService;

    @PostMapping("/upload")
    public ResponseEntity<SessionResponseDto> upload(@RequestParam("file") MultipartFile file) throws Exception {
        return ResponseEntity.ok(sessionService.createSession(file));
    }
}