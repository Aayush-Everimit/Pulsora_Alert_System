package com.projects.Pulsora.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class DisasterEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType;

    private String location;

    private double magnitude;
    public enum Severity {
        LOW,
        MEDIUM,
        HIGH
    }
    public enum Status {
        REPORTED,
        CONFIRMED,
        RESOLVED
    }
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Severity severity;

    @Column(name = "time_stamp")
    private LocalDateTime timeStamp;

    private String apiSource;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

}
