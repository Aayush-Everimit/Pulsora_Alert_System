package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
    List<Users> findByLocationIgnoreCase(String Location);
}
