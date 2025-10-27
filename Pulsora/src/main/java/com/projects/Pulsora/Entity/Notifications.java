package com.projects.Pulsora.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Notifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "disaster_event_id")
    private DisasterEvent disasterEvent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    private String message;          // Add this!

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Enumerated(EnumType.STRING)
    private StatusType statusType;

    // Enums should be public static (so JPA & other classes can see them)
    public enum NotificationType {
        INITIAL_CONFIRMATION,
        GENERAL_GUIDELINE,
        PERSONALIZED_GUIDANCE
    }

    public enum StatusType {
        SENT,
        FAILED,
        READ
    }

    public Notifications() {} // Default JPA constructor

    public Notifications(String message, Users user, DisasterEvent disasterEvent) {
        this.message = message;
        this.user = user;
        this.disasterEvent = disasterEvent;
        this.sentAt = LocalDateTime.now();
        this.statusType = StatusType.SENT;
        this.notificationType = NotificationType.INITIAL_CONFIRMATION;
    }
}
