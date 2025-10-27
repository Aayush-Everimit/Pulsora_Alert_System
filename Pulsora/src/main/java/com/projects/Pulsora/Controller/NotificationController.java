package com.projects.Pulsora.Controller;

import com.projects.Pulsora.Entity.Notifications;
import com.projects.Pulsora.Service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotificationController
{
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/alerts")
    public ResponseEntity<Notifications> sendNotification(@RequestBody Notifications notification)
    {
        return notificationService.sendNotification(notification)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
    @GetMapping("alerts")
    public ResponseEntity<List<Notifications>> getAllNotifications()
    {
        return notificationService.getAllNotifications()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("alerts/{id}")
    public ResponseEntity<Notifications> getNotificationById(@PathVariable long id)
    {
        return notificationService.getNotificationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/alerts/{id}")
    public ResponseEntity<String> deleteNotificationById(@PathVariable long id)
    {
        return notificationService.deleteNotification(id);
    }
}
