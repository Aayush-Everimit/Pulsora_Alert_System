package com.projects.Pulsora.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfiguration; // Import this
import org.springframework.web.cors.CorsConfigurationSource; // Import this
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // Import this

import java.util.Arrays; // Import this
import java.util.List;

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
                // --- ADD CORS CONFIGURATION ---
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // -----------------------------

                // Explicitly disable CSRF
                .csrf(AbstractHttpConfigurer::disable)

                // Disable HTTP Basic authentication prompt but allow anonymous
                .httpBasic(Customizer.withDefaults()).anonymous(Customizer.withDefaults())

                .authorizeHttpRequests(authz -> authz
                        // Explicitly permit all requests without any conditions (for now)
                        .requestMatchers("/**").permitAll()
                        .anyRequest().permitAll()
                )

                // Keep stateless session management
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        return http.build();
    }

    // --- ADD THIS BEAN TO CONFIGURE CORS ---
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Allow requests from typical frontend dev server origins
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175", // Your frontend is running here now
                "http://127.0.0.1:5173",
                "http://127.0.0.1:5174",
                "http://127.0.0.1:5175",
                "https://d2lv48-5175.csb.app",
                "https://marquerite-unprotecting-amber.ngrok-free.dev"
                // Add other origins if needed (e.g., CodeSandbox URL)
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allow needed methods
        configuration.setAllowedHeaders(List.of("*")); // Allow all headers for simplicity in dev
        // configuration.setAllowCredentials(true); // Uncomment if you need cookies/credentials later
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply config to all API paths
        return source;
    }
    // ----------------------------------------
}