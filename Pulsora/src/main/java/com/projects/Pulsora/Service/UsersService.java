package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.Users;
import com.projects.Pulsora.Repository.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService
{
    private final UsersRepository usersRepository;
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<Users> InProximity(DisasterEvent event)
    {
        if(event == null || event.getLocation() == null || event.getLocation().isEmpty())
            return List.of();
        String eventLocation = event.getLocation().toLowerCase();
        return usersRepository.findByLocationIgnoreCase(eventLocation);
    }

    public Optional<Users> findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    public Optional<Users> findById(Long id) {
        return usersRepository.findById(id);
    }

    public Users createNewUser(Users user) {
        return usersRepository.save(user);
    }

    public Optional<Users> updateExistingUser(Long id, Users user) {
        return usersRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setEmail(user.getEmail());
                    existingUser.setUsername(user.getUsername());
                    existingUser.setRole(user.getRole());
                    existingUser.setLocation(user.getLocation());
                    return usersRepository.save(existingUser);
                });
    }

    public ResponseEntity<String> deleteUser(Long id) {
        if (usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
            return ResponseEntity.ok("User deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
