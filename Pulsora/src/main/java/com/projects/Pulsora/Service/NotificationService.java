package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.User;
import com.projects.Pulsora.Entity.AIResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final UsersService usersService;


    public void sendInitialNotificationToUsers(DisasterEvent event) {
        if (event == null || event.getLocation() == null) {
            log.warn("Cannot send Notification-I: event or location missing.");
            return;
        }

        String targetLocation = event.getLocation().trim().toLowerCase();
        List<User> usersInProximity = usersService.findByLocation(targetLocation);

        if (usersInProximity.isEmpty()) {
            log.info("No users found in location: {}", targetLocation);
            return;
        }

        log.info("Sending Notification-I for Disaster Event [{}] to {} users in location: {}",
                event.getEventType(), usersInProximity.size(), targetLocation);

        for (User user : usersInProximity) {
            // Actual SEND logic
            log.info("🚨 [Notification-I] Sent to {} ({}) | Event: {} | Severity: {} | Time: {}",
                    user.getUsername(), user.getEmail(), event.getEventType(), event.getSeverity(), LocalDateTime.now());
        }

        log.info("✅ Notification-I successfully dispatched for event: {}", event.getId());
    }

    public void sendFinalNotificationAfterAIAnalysis(AIResponse aiResponse) {
        if (aiResponse == null || aiResponse.getDisasterEvent() == null) {
            log.warn("Cannot send Notification-II: AI Response or Event missing.");
            return;
        }

        DisasterEvent event = aiResponse.getDisasterEvent();
        List<User> usersInProximity = usersService.findByLocation(event.getLocation());

        if (usersInProximity.isEmpty()) {
            log.info("No users found in location: {} for Notification-II", event.getLocation());
            return;
        }

        log.info("🤖 Sending Notification-II for Disaster Event [{}] with AI Recommendation to {} users",
                event.getEventType(), usersInProximity.size());

        for (User user : usersInProximity) {
            log.info("[Notification-II] Sent to {} ({}) | Recommendation: {}",
                    user.getUsername(), user.getEmail(), aiResponse.getRecommendedAction());
        }

        log.info("Notification-II successfully delivered for AI Response ID: {}", aiResponse.getId());
    }
}
