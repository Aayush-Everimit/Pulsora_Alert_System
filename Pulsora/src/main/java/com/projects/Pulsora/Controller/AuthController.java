package com.projects.Pulsora.Controller;

import com.projects.Pulsora.Entity.LoginRequest;
import com.projects.Pulsora.Entity.User;
import com.projects.Pulsora.Service.UsersService;
import com.projects.Pulsora.Utility.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsersService usersService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(usersService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getEmail(), req.getPassword()
                )
        );

        User user = usersService.findByEmailOrThrow(req.getEmail());

        return ResponseEntity.ok(
                Map.of(
                        "token", jwtUtil.generateToken(user.getEmail()),
                        "userId", user.getId()
                )
        );
    }
}
