package com.projects.Pulsora.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse_dto {

    private Long userId;
    private Long disasterEventId;
    private UserResponse.ResponseType responseType;
    private String description;
}
