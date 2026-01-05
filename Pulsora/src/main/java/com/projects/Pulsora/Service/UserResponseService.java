package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.User;
import com.projects.Pulsora.Entity.UserResponse;
import com.projects.Pulsora.Repository.DisasterEventRepository;

import com.projects.Pulsora.Repository.UserResponseRepository;
import com.projects.Pulsora.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
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

    @Transactional
    public UserResponse submitResponse(Long userId, Long disasterEventId, UserResponse.ResponseType responseType, String description) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        DisasterEvent event = disasterEventRepository.findById(disasterEventId)
                .orElseThrow(() -> new RuntimeException("Disaster event not found"));

        // Prevent duplicate response
        if (userResponseRepository.existsByUserAndDisasterEvent(user, event)) {
            throw new RuntimeException("Response already submitted for this event");
        }

        UserResponse response = new UserResponse();
        response.setUser(user);                    // ✅ YOU MISSED THIS
        response.setDisasterEvent(event);          // ✅ link disaster event
        response.setResponse(responseType);        // enum type
        response.setDescription(description);
        response.setResponseTime(LocalDateTime.now());

        return userResponseRepository.save(response);

    }

    public List<UserResponse> getAllResponses() {
        return userResponseRepository.findAll();
    }
}
