package com.projects.Pulsora.Service;

import aj.org.objectweb.asm.commons.Remapper;
import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Repository.DisasterEventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class DisasterEventService
{
    private final DisasterEventRepository disasterEventRepository;
    private final NotificationService notificationService;

    public DisasterEventService(DisasterEventRepository disasterEventRepository, NotificationService notificationService) {
        this.disasterEventRepository = disasterEventRepository;
        this.notificationService = notificationService;
    }

    public DisasterEvent createEventAndNotify(DisasterEvent disasterEvent)
    {
        DisasterEvent savedEvent = disasterEventRepository.save(disasterEvent);
        notificationService.sendInitialNotificationToUsers(savedEvent);
        return savedEvent;
    }

    public List<DisasterEvent> getAllEvents() {
        return disasterEventRepository.findAll();
    }

    public Optional<DisasterEvent> getAllEventsById(long id) {
        return disasterEventRepository.findById(id);
    }
}
