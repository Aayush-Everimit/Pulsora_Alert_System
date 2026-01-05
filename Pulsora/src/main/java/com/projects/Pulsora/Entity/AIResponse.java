package com.projects.Pulsora.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(
        name = "ai_response",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"disaster_event_id", "users_id"})
        }
)
public class AIResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disaster_event_id", nullable = false)
    @JsonIgnore
    private DisasterEvent disasterEvent;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    @JsonIgnore
    private User user;


    @Column(name = "aggregate_summary", columnDefinition = "TEXT")
    private String aggregateSummary;

    @Column(name = "recommended_action", columnDefinition = "TEXT")
    private String recommendedAction;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "AIResponse{" +
                "id=" + id +
                ", user=" + (user != null ? user.getUsername() : "N/A") +
                ", event=" + (disasterEvent != null ? disasterEvent.getEventType() : "N/A") +
                ", createdAt=" + createdAt +
                '}';
    }
}
