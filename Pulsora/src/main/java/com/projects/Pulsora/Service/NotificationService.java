package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.Notifications;
import com.projects.Pulsora.Entity.UserResponse;
import com.projects.Pulsora.Entity.Users;
import com.projects.Pulsora.Repository.NotificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationService
{
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Optional<Notifications> sendNotification(Notifications notification)
    {
        return Optional.of(notificationRepository.save(notification));
    }

    public Optional<List<Notifications>> getAllNotifications()
    {
        return Optional.of(notificationRepository.findAll());
    }

    public Optional<Notifications> getNotificationById(long id)
    {
        return notificationRepository.findById(id);
    }

    public ResponseEntity<String> deleteNotification(long id)
    {
        if(notificationRepository.findById(id).isPresent())
        {
            notificationRepository.deleteById(id);
            return ResponseEntity.ok("Notification deleted");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notification not found");
        }
    }

    public void sendInitialNotificationToUsers(DisasterEvent savedEvent) {
        List<Users> usersToNotify = UsersService.InProximity();
        String enumOptions = Arrays.stream(UserResponse.ResponseType.values())
                .map(Enum::name)
                .collect(Collectors.joining(", "));


        for (Users user : usersToNotify) {
            String message = String.format("Disaster event: %s at %s.\nDid you experience it? Respond with one of: %s",
                    savedEvent.getEventType(), savedEvent.getLocation(), enumOptions);
            Notifications notif = new Notifications(
                    message,
                    user,
                    savedEvent
            );
            notificationRepository.save(notif);
        }
    }
}
