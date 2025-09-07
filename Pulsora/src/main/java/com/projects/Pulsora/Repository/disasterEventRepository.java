package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.DisasterEvent;
import com.projects.Pulsora.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface disasterEventRepository extends JpaRepository<DisasterEvent,Long> {
}
