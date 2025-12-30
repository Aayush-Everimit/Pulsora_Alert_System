package com.projects.Pulsora.Controller;

import com.projects.Pulsora.Entity.Users;
import com.projects.Pulsora.Service.UsersService;
import com.projects.Pulsora.Utility.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@Slf4j
public class UsersController
{
    private final UsersService usersService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    public UsersController(UsersService usersService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.usersService = usersService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<Users> getUserByEmail(@PathVariable String email)
    {
        return usersService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable Long id) {
        return usersService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/users")
    public ResponseEntity<Users> signUp(@RequestBody Users user) {
        Users savedUser = usersService.createNewUser(user);
        URI location = URI.create("/users/" + savedUser.getId());
        return ResponseEntity.created(location).body(savedUser);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users user)
    {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            Optional<Users> users = usersService.findByEmail(user.getEmail());
            if (users.isPresent())
            {
                jwtUtil.generateToken(user.getUsername());
            }
        }
        catch (Exception e)
        {
            log.error("Exception occurred while trying to login using username and password", e);
            return new ResponseEntity<>("Incorrect Username Or Password " , HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users user)
    {
        return usersService.updateExistingUser(id,user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id)
    {
        return usersService.deleteUser(id);
    }

}
