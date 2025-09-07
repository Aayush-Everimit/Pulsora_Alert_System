package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.HistoricalFact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricalFactRepository extends JpaRepository<HistoricalFact,Long> {
}
