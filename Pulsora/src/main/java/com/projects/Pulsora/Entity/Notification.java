package com.projects.Pulsora.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.security.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Notification
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "disaster_event_id")
    private DisasterEvent disasterEvent;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
    private enum notificationType
    {
        INITIAL_CONFIRMATION,
        GENERAL_GUIDELINE,
        PERSONALIZED_GUIDANCE
    }
    @Column(name = "sent_at")
    private LocalDateTime sentAt;
    private enum statusType
    {
        Sent,
        Failed,
        Read
    }

}
