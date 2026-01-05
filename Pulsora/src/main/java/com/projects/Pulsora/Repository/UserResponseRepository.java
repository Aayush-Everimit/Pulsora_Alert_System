package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.User;
import com.projects.Pulsora.Entity.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserResponseRepository
        extends JpaRepository<UserResponse, Long> {

    Optional<UserResponse> findByUserAndDisasterEvent(
            User user,
            DisasterEvent disasterEvent
    );

    boolean existsByUserAndDisasterEvent(
            User user,
            DisasterEvent disasterEvent
    );
}
