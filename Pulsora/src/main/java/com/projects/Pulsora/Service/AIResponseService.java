package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.*;
import com.projects.Pulsora.Repository.AIResponseRepository;
import com.projects.Pulsora.Repository.UserResponseRepository;
import com.projects.Pulsora.Utility.GeminiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIResponseService {

    private final AIResponseRepository aiResponseRepository;
    private final UserResponseRepository userResponseRepository;
    private final UsersService usersService;
    private final DisasterEventService disasterEventService;
    private final NotificationService notificationService;
    private final GeminiClient geminiClient;

    /* =========================
       MAIN ENTRY POINT
       ========================= */

    @Transactional
    public AIResponse_dto generatePersonalizedAIAnalysis(Long disasterEventId, Long userId) {

        DisasterEvent event = disasterEventService.getEventById(disasterEventId)
                .orElseThrow(() -> new RuntimeException("Disaster Event not found"));

        User user = usersService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<UserResponse> userResponseOpt =
                userResponseRepository.findByUserAndDisasterEvent(user, event);

        String prompt = buildPrompt(event, user, userResponseOpt.orElse(null));

        log.info("🤖 Gemini generating AI response for user '{}' (Event: {})",
                user.getUsername(), event.getEventType());

        String aiText = geminiClient.generateText(prompt);

        if (aiText == null || aiText.isBlank()) {
            aiText = fallbackText();
        }

        ParsedAI parsed = parseAIResponse(aiText);

        AIResponse entity = getOrCreateAIResponse(user, event);
        entity.setAggregateSummary(parsed.summary());
        entity.setRecommendedAction(parsed.actions());

        AIResponse saved = aiResponseRepository.saveAndFlush(entity);

        notificationService.sendFinalNotificationAfterAIAnalysis(saved);

        return toDto(saved);
    }

    /* =========================
       CREATE / UPDATE SAFELY
       ========================= */

    private AIResponse getOrCreateAIResponse(User user, DisasterEvent event) {
        return aiResponseRepository
                .findByUserAndDisasterEvent(user, event)
                .orElseGet(() -> {
                    AIResponse ai = new AIResponse();
                    ai.setUser(user);
                    ai.setDisasterEvent(event);
                    return ai;
                });
    }

    /* =========================
       PROMPT ENGINEERING
       ========================= */

    private String buildPrompt(
            DisasterEvent event,
            User user,
            UserResponse userResponse
    ) {

        return """
        You are an emergency disaster response assistant.

        RULES:
        - Be calm, practical, and reassuring
        - No emojis
        - No medical jargon
        - Use short bullet points only

        OUTPUT FORMAT (STRICT):

        SUMMARY:
        2–3 lines explaining the situation and risk.

        ACTIONS:
        - Immediate actions (bullets)
        - After-event actions (bullets)

        WARNINGS:
        - Safety warnings (bullets, optional)

        EVENT:
        Type: %s
        Location: %s
        Severity: %s

        USER:
        Name: %s
        Location: %s
        Response: %s
        Description: %s
        """.formatted(
                event.getEventType(),
                event.getLocation(),
                event.getSeverity(),
                user.getUsername(),
                user.getLocation(),
                userResponse != null ? userResponse.getResponse() : "None",
                userResponse != null ? userResponse.getDescription() : "None"
        );
    }

    /* =========================
       AI PARSING (CRITICAL)
       ========================= */

    private ParsedAI parseAIResponse(String text) {

        String summary = "";
        String actions = "";

        String[] sections = text.split("\n\n");

        for (String block : sections) {
            if (block.toUpperCase().startsWith("SUMMARY")) {
                summary = block.replaceFirst("(?i)SUMMARY:", "").trim();
            }
            if (block.toUpperCase().startsWith("ACTIONS")) {
                actions = block.replaceFirst("(?i)ACTIONS:", "").trim();
            }
        }

        if (summary.isBlank()) {
            summary = "A serious disaster has been reported in your area. Immediate caution is required.";
        }

        if (actions.isBlank()) {
            actions = """
            - Move to a safe location
            - Follow official emergency instructions
            - Avoid unnecessary travel
            """;
        }

        return new ParsedAI(summary, actions);
    }

    public List<AIResponse> getResponsesByUserId(Long userId)
    {
        return aiResponseRepository.findByUserId(userId);
    }

    public List<AIResponse> getResponsesByEventId(Long eventId)
    {
        return aiResponseRepository.findByDisasterEventId(eventId);
    }

    private record ParsedAI(String summary, String actions) {}

    private String fallbackText() {
        return """
        SUMMARY:
        A disaster has been reported in your area. Authorities are assessing the situation.

        ACTIONS:
        - Stay calm and move to a safe place
        - Follow instructions from local authorities
        - Avoid dangerous areas
        """;
    }

    /* =========================
       DTO MAPPING
       ========================= */

    private AIResponse_dto toDto(AIResponse ai) {
        DisasterEvent e = ai.getDisasterEvent();

        return new AIResponse_dto(
                ai.getId(),
                e.getId(),
                e.getEventType(),
                e.getLocation(),
                e.getSeverity().name(),
                ai.getAggregateSummary(),
                ai.getRecommendedAction(),
                ai.getCreatedAt()
        );
    }
//    public List<AIResponse> getResponsesByUser(us) { return aiResponseRepository.findByUser(user); }
//    public List<AIResponse> getResponsesByEvent(DisasterEvent event) { return aiResponseRepository.findByDisasterEvent(event); }
}
