package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.UserResponse;
import com.projects.Pulsora.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userResponseRepository extends JpaRepository<UserResponse,Long> {
}
