package com.projects.Pulsora.Repository;

import com.projects.Pulsora.Entity.HistoricalFact;
import com.projects.Pulsora.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface historicalFactRepository extends JpaRepository<HistoricalFact,Long> {
}
