package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.DisasterEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisasterEventRepository extends JpaRepository<DisasterEvent, Long>
{
}
