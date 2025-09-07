package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
}
