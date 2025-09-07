package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.DisasterEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisasterEventRepository extends JpaRepository<DisasterEvent,Long> {
}
