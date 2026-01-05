package com.projects.Pulsora.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "disaster_event")
public class DisasterEvent {

    public enum Severity {
        LOW, MEDIUM, HIGH
    }

    public enum Status {
        REPORTED, CONFIRMED, RESOLVED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_type", length = 255)
    private String eventType;

    @Column(length = 255)
    private String location;

    private Double magnitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Severity severity;

    @Column(name = "time_stamp", updatable = false)
    private LocalDateTime timeStamp;

    private Double latitude;
    private Double longitude;

    @Column(name = "api_source", length = 255)
    private String apiSource;

    /**
     * ❌ Prevent infinite recursion
     * DisasterEvent -> UserResponse -> DisasterEvent -> ...
     */
    @OneToMany(mappedBy = "disasterEvent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<UserResponse> userResponses;

    /**
     * ❌ Prevent infinite recursion
     * DisasterEvent -> AIResponse -> DisasterEvent -> ...
     */
    @OneToMany(mappedBy = "disasterEvent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<AIResponse> aiResponses;


    @PrePersist
    protected void onCreate() {
        this.timeStamp = LocalDateTime.now();
    }
}
