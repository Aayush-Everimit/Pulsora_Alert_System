package com.projects.Pulsora.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer; // Import this

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Explicitly disable CSRF
                .csrf(csrf -> csrf.disable())

                // Disable HTTP Basic authentication prompt
                .httpBasic(Customizer.withDefaults()).anonymous(Customizer.withDefaults()) // Disables basic auth prompt but allows anonymous access

                .authorizeHttpRequests(authz -> authz
                        // Explicitly permit all requests without any conditions
                        .requestMatchers("/**").permitAll()
                        .anyRequest().permitAll() // Ensure even requests missed by /** are permitted
                )

                // Keep stateless session management
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        return http.build();
    }
}