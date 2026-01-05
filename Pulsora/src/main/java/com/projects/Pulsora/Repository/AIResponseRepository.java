package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.AIResponse;
import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AIResponseRepository extends JpaRepository<AIResponse, Long> {
    List<AIResponse> findByDisasterEvent(DisasterEvent disasterEvent);

    Optional<AIResponse> findByUserAndDisasterEvent(User user, DisasterEvent event);

    List<AIResponse> findByUser(User user);

    List<AIResponse> findByUserId(Long user_id);

    List<AIResponse> findByDisasterEventId(Long eventId);
}
