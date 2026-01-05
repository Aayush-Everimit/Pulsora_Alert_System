package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.User;
import com.projects.Pulsora.Repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsersService implements UserDetailsService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = usersRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }


    public User findByEmailOrThrow(String email) {
        return usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> findById(Long userId) {
        return usersRepository.findById(userId);
    }

    public Optional<User> findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    public List<User> findByLocation(String targetLocation) {
        return usersRepository.findByLocationIgnoreCase(targetLocation);
    }

    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }


    @Transactional
    public Optional<User> updateExistingUser(Long id, User updatedUser) {

        return usersRepository.findById(id).map(existingUser -> {

            if (updatedUser.getEmail() != null && !updatedUser.getEmail().isBlank()) {
                existingUser.setEmail(updatedUser.getEmail());
            }

            if (updatedUser.getUsername() != null && !updatedUser.getUsername().isBlank()) {
                existingUser.setUsername(updatedUser.getUsername());
            }

            if (updatedUser.getLocation() != null && !updatedUser.getLocation().isBlank()) {
                existingUser.setLocation(updatedUser.getLocation());
            }

            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
                existingUser.setPassword(
                        passwordEncoder.encode(updatedUser.getPassword())
                );
            }

            return usersRepository.save(existingUser);
        });
    }


    public ResponseEntity<String> deleteUser(Long id) {

        if (!usersRepository.existsById(id)) {
            return ResponseEntity.notFound()
                    .build();
        }

        usersRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
