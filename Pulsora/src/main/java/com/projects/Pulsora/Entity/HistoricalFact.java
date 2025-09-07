package com.projects.Pulsora.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
@Getter
@Setter
@Entity
public class HistoricalFact
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String eventType;
    @Column(length = 2000)
    private String description;
    private LocalDateTime eventDate;
    private String Location;
    private double magnitude;
}
