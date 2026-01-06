package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.AIResponse;
import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailNotificationService {

    private final MailService mailService;

    @Async
    public void sendEmail(User user, DisasterEvent event) {
        try {
            String subject = event.getSeverity() + " Alert: " + event.getEventType();

            String html = """
                    <h2>🚨 Pulsora Alert System</h2>
                    <p>Dear %s,</p>
                    <p>A new disaster has been reported:</p>
                    <ul>
                        <li><b>Type:</b> %s</li>
                        <li><b>Location:</b> %s</li>
                        <li><b>Severity:</b> %s</li>
                        <li><b>Magnitude:</b> %.2f</li>
                    </ul>
                    <p>Stay safe and alert.</p>
                    <hr/>
                    <small>Pulsora Alert Notification Service</small>
                    """.formatted(
                    user.getUsername(), event.getEventType(),
                    event.getLocation(), event.getSeverity(),
                    event.getMagnitude()
            );

            mailService.sendHtmlMail(user.getEmail(), subject, html);
            log.info("📩 Disaster alert email sent to {} ({})", user.getUsername(), user.getEmail());

        } catch (Exception e) {
            log.error("❌ Failed to send alert email to {}: {}", user.getEmail(), e.getMessage());
        }
    }
    @Async
    public void sendAIRecommendationEmail(User user, AIResponse aiResponse) {
        try {
            DisasterEvent event = aiResponse.getDisasterEvent();

            String subject = "AI Recommendation: " + event.getEventType() + " (" + event.getSeverity() + ")";

            String html = """
                    <h2>🤖 Pulsora AI Advisory</h2>
                    <p>Dear %s,</p>
                    <p>Our AI has analyzed the recent disaster and generated safety recommendations:</p>
                    <blockquote style="font-style: italic; background-color: #f8f8f8; padding: 10px; border-left: 4px solid #007BFF;">
                        %s
                    </blockquote>
                    <p><b>Event Summary:</b></p>
                    <ul>
                        <li><b>Type:</b> %s</li>
                        <li><b>Location:</b> %s</li>
                        <li><b>Severity:</b> %s</li>
                        <li><b>Magnitude:</b> %.2f</li>
                    </ul>
                    <p>Stay safe and follow local emergency updates.</p>
                    <hr/>
                    <small>Pulsora AI Response System</small>
                    """.formatted(
                    user.getUsername(),
                    aiResponse.getRecommendedAction(),
                    event.getEventType(),
                    event.getLocation(),
                    event.getSeverity(),
                    event.getMagnitude()
            );

            mailService.sendHtmlMail(user.getEmail(), subject, html);
            log.info(" AI recommendation email sent to {} ({})", user.getUsername(), user.getEmail());

        } catch (Exception e) {
            log.error("❌ Failed to send AI recommendation email to {}: {}", user.getEmail(), e.getMessage());
        }
    }
}
