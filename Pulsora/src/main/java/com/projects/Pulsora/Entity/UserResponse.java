package com.projects.Pulsora.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.security.Timestamp;

@Getter
@Setter
@Entity
public class UserResponse
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable=false)
    private String userName;
    @Column
    private String disasterEvent;
    public enum responseType
    {
        Felt,
        Not_Felt,
        No_Response
    }
    @Enumerated(EnumType.STRING)
    @Column(name = "response_time")
    private Timestamp responseTime;
}
