package com.projects.Pulsora.Service;

import com.projects.Pulsora.Repository.NotificationRepository;
import com.projects.Pulsora.Repository.NotificationRepositoryImpl;
import com.projects.Pulsora.Repository.UserResponseRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationService
{
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
}
