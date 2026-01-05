package com.projects.Pulsora.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AIResponse_dto {

    private Long id;
    private Long eventId;
    private String eventType;
    private String location;
    private String severity;

    private String aggregateSummary;
    private String recommendedAction;

    private LocalDateTime createdAt;
}
