package com.projects.Pulsora.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@Table(name = "user_response")
public class UserResponse {

    public enum ResponseType {
        FELT, NOT_FELT, NO_RESPONSE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disaster_event_id", nullable = false)
    @JsonIgnore
    private DisasterEvent disasterEvent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResponseType response;

    @Column(length = 500)
    private String description;

    @Column(name = "response_time", updatable = false)
    private LocalDateTime responseTime;

    @PrePersist
    protected void onCreate() {
        this.responseTime = LocalDateTime.now();
    }
}
