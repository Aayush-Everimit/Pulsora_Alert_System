package com.projects.Pulsora.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class UserResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "disaster_event_id")
    private DisasterEvent disasterEvent;

    @Column(nullable = false)
    private String disasterEvent;
    public enum ResponseType {
        FELT,
        NOT_FELT,
        NO_RESPONSE
    }
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResponseType response;

    @Column(name = "response_time")
    private LocalDateTime responseTime;

}
