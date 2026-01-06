package com.projects.Pulsora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com.projects.Pulsora")
@EnableScheduling
public class PulsoraApplication {
    public static void main(String[] args) {
        SpringApplication.run(PulsoraApplication.class, args);
    }
}
