package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.*;
import com.projects.Pulsora.Events.UserResponseSubmittedEvent;
import com.projects.Pulsora.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserResponseService {

    private final UsersRepository userRepository;
    private final DisasterEventRepository disasterEventRepository;
    private final UserResponseRepository userResponseRepository;
    private final ApplicationEventPublisher eventPublisher; // ✅ instead of AIResponseService

    @Transactional
    public UserResponse submitResponse(Long userId, Long disasterEventId, UserResponse.ResponseType responseType, String description) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        DisasterEvent event = disasterEventRepository.findById(disasterEventId)
                .orElseThrow(() -> new RuntimeException("Disaster event not found"));

        UserResponse savedResponse = userResponseRepository.findByUserAndDisasterEvent(user, event)
                .map(existing -> {
                    existing.setResponse(responseType);
                    existing.setDescription(description);
                    existing.setResponseTime(LocalDateTime.now());
                    return userResponseRepository.save(existing);
                })
                .orElseGet(() -> {
                    UserResponse newResponse = new UserResponse();
                    newResponse.setUser(user);
                    newResponse.setDisasterEvent(event);
                    newResponse.setResponse(responseType);
                    newResponse.setDescription(description);
                    newResponse.setResponseTime(LocalDateTime.now());
                    return userResponseRepository.save(newResponse);
                });

        // ✅ Publish event (decoupled trigger)
        eventPublisher.publishEvent(new UserResponseSubmittedEvent(userId, disasterEventId));

        return savedResponse;
    }

    public List<UserResponse> getAllResponses() {
        return userResponseRepository.findAll();
    }
}
