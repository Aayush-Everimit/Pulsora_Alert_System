package com.projects.Pulsora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.projects.Pulsora") // ✅ ensures Controllers are discovered
public class PulsoraApplication {
    public static void main(String[] args) {
        SpringApplication.run(PulsoraApplication.class, args);
    }
}
