package com.projects.Pulsora.Entity;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.security.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "users")
public class Users
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true, nullable=false)
    private String username;
    @Column(nullable=false)
    private String password;
    @Column(unique = true, nullable=false)
    private String email;
    @Column
    private String location;
    public enum Role {
        ADMIN,
        USER,
        VOLUNTEER
    }
    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Role role;
    @Column(name = "registered_at")
    private LocalDateTime registerAt;
    @Column(name = "last_active_at")
    private LocalDateTime lastActiveAt;

}
