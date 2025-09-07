package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.Notification;
import com.projects.Pulsora.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface notificationRepository extends JpaRepository<Notification,Long> {
}
