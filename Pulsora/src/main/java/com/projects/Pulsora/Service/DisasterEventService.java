package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.HeatMap_dto;
import com.projects.Pulsora.Repository.DisasterEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DisasterEventService {

    private final DisasterEventRepository disasterEventRepository;
    private final NotificationService notificationService;


    public DisasterEvent createEventAndNotify(DisasterEvent disasterEvent) {
        DisasterEvent savedEvent = disasterEventRepository.save(disasterEvent);
        log.info("Created new disaster event: {}", savedEvent.getEventType());
        try {
            notificationService.sendInitialNotificationToUsers(savedEvent);
        } catch (Exception e) {
            log.error("Failed to send notification for event {}: {}", savedEvent.getId(), e.getMessage());
        }
        return savedEvent;
    }

    public List<DisasterEvent> getAllEvents() {
        return disasterEventRepository.findAll();
    }

    public Optional<DisasterEvent> getEventById(Long id) {
        return disasterEventRepository.findById(id);
    }


    public Optional<DisasterEvent> updateEvent(Long id, DisasterEvent updatedEvent) {
        return disasterEventRepository.findById(id).map(existingEvent -> {
            existingEvent.setEventType(updatedEvent.getEventType());
            existingEvent.setLocation(updatedEvent.getLocation());
            existingEvent.setMagnitude(updatedEvent.getMagnitude());
            existingEvent.setSeverity(updatedEvent.getSeverity());
            existingEvent.setApiSource(updatedEvent.getApiSource());
            return disasterEventRepository.save(existingEvent);
        });
    }


    public ResponseEntity<String> deleteEvent(Long id) {
        if (disasterEventRepository.existsById(id)) {
            disasterEventRepository.deleteById(id);
            return ResponseEntity.ok("Disaster event deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Disaster event not found with ID: " + id);
    }

    public List<HeatMap_dto> createHeatMap()
    {
        return disasterEventRepository.findAll().stream().map(event -> new HeatMap_dto (event.getLatitude(),event.getLongitude(),event.getSeverity().name(),event.getMagnitude())).toList();
    }
}
