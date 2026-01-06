package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.User;
import com.projects.Pulsora.Entity.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("SELECT COUNT(r) FROM UserResponse r WHERE r.disasterEvent.id = :eventId")
    long countTotalResponsesByEventId(@Param("eventId") Long eventId);

    @Query("SELECT Count(r) from UserResponse r where r.user.id= :userId")
    long countTotalResponsesByUserId(@Param("userId") Long userId);

}
