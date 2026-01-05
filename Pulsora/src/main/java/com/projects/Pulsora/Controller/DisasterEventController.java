package com.projects.Pulsora.Controller;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.HeatMap_dto;
import com.projects.Pulsora.Service.DisasterEventService;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/disaster-events")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://marquerite-unprotecting-amber.ngrok-free.dev"
})
@RequiredArgsConstructor
@Slf4j
public class DisasterEventController {

    private final DisasterEventService disasterEventService;

    @PostMapping
    //@PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createDisasterEvent(@RequestBody DisasterEvent disasterEvent) {
        try {
            DisasterEvent created = disasterEventService.createEventAndNotify(disasterEvent);
            URI location = URI.create("/api/v1/disaster-events/" + created.getId());
            return ResponseEntity.created(location).body(created);
        } catch (Exception e) {
            log.error("Failed to create disaster event: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create disaster event: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<DisasterEvent>> getAllDisasterEvents() {
        List<DisasterEvent> events = disasterEventService.getAllEvents();
        return ResponseEntity.ok(events); // ✅ empty list is fine
    }



    @GetMapping("/{id}")
    public ResponseEntity<?> getDisasterEventById(@PathVariable Long id) {
        Optional<DisasterEvent> event = disasterEventService.getEventById(id);
        return event.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Disaster event not found with ID: " + id));
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateDisasterEvent(@PathVariable Long id, @RequestBody DisasterEvent updatedEvent) {
        Optional<DisasterEvent> event = disasterEventService.updateEvent(id, updatedEvent);
        return event.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Disaster event not found for update with ID: " + id));
    }

    @GetMapping("/heatmap")
    @PermitAll
    public List<HeatMap_dto> getHeatmap() {
        return disasterEventService.createHeatMap();
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deleteDisasterEvent(@PathVariable Long id) {
        return disasterEventService.deleteEvent(id);
    }
}
