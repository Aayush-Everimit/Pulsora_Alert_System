package com.projects.Pulsora.Controller;
import com.projects.Pulsora.Entity.AIResponse;
import com.projects.Pulsora.Entity.AIResponse_dto;
import com.projects.Pulsora.Service.AIResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;@RestController
@RequestMapping("/api/v1/ai-responses")
@RequiredArgsConstructor
public class AIResponseController {

    private final AIResponseService aiResponseService;

    @PostMapping("/generate/{userId}/{eventId}")
    public ResponseEntity<AIResponse_dto> generate(
            @PathVariable Long userId,
            @PathVariable Long eventId
    ) {
        return ResponseEntity.ok(
                aiResponseService.generatePersonalizedAIAnalysis(eventId, userId)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AIResponse>> getByUser(@PathVariable Long userId, Authentication authentication) {
        System.out.println("Authenticated user: " + authentication.getName());
        return ResponseEntity.ok( aiResponseService.getResponsesByUserId(userId));
    }

    @GetMapping("/event/{eventId}")
    public List<AIResponse> getByEvent(@PathVariable Long eventId) {
        return aiResponseService.getResponsesByEventId(eventId);
    }
}
