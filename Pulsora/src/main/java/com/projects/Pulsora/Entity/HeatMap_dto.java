package com.projects.Pulsora.Entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeatMap_dto {
    private Double latitude;
    private Double longitude;

    private String severity;
    private Double magnitude;

}
