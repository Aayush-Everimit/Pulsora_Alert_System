package com.projects.Pulsora.Controller;
import com.projects.Pulsora.Entity.AIResponse;
import com.projects.Pulsora.Entity.AIResponse_dto;
import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.User;
import com.projects.Pulsora.Repository.AIResponseRepository;
import com.projects.Pulsora.Service.AIResponseService;
import com.projects.Pulsora.Service.DisasterEventService;
import com.projects.Pulsora.Service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/ai-responses")
@RequiredArgsConstructor
public class AIResponseController {

    private final AIResponseService aiResponseService;
    private final UsersService usersService;
    private final DisasterEventService disasterEventService;
    private final AIResponseRepository aIResponseRepository;

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

    @GetMapping("/user/{userId}/event/{eventId}")
    public ResponseEntity<?>getByUserAndEvent(@PathVariable Long userId, @PathVariable Long eventId) {

    AIResponse_dto dto = aiResponseService.getOrGenerateResponse(userId, eventId);
    return ResponseEntity.ok(dto);
    }
}
