package com.gradia.learnai.controller;

import com.gradia.learnai.dto.AiRequestDto;
import com.gradia.learnai.dto.AiResponseDto;
import com.gradia.learnai.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/process")
    public ResponseEntity<AiResponseDto> process(@RequestBody AiRequestDto dto) throws Exception {
        String result = switch (dto.getType()) {
            case "summary"     -> aiService.summarize(dto.getText());
            case "keywords"    -> aiService.extractKeywords(dto.getText());
            case "definition"  -> aiService.define(dto.getKeyword());
            case "explanation" -> aiService.explain(dto.getKeyword());
            default -> throw new IllegalArgumentException("지원하지 않는 type: " + dto.getType());
        };

        return ResponseEntity.ok(AiResponseDto.builder()
            .type(dto.getType())
            .result(result)
            .build());
    }
}