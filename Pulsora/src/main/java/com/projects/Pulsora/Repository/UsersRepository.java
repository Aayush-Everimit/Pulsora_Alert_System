package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UsersRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByLocationIgnoreCase(String location);

}
