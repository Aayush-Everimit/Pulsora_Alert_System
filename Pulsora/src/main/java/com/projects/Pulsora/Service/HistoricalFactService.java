package com.projects.Pulsora.Service;

import com.projects.Pulsora.Repository.HistoricalFactRepository;
import com.projects.Pulsora.Repository.UserResponseRepository;
import org.springframework.stereotype.Service;

@Service
public class HistoricalFactService
{
    private final HistoricalFactRepository historicalFactRepository;

    public HistoricalFactService(HistoricalFactRepository historicalFactRepository) {
        this.historicalFactRepository = historicalFactRepository;
    }
}
