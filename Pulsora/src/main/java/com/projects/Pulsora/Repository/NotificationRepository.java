package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {
}
