package com.projects.Pulsora.Service;

import com.projects.Pulsora.Repository.DisasterEventRepository;
import com.projects.Pulsora.Repository.UserResponseRepository;
import org.springframework.stereotype.Service;

@Service
public class DisasterEventService
{
    private final DisasterEventRepository disasterEventRepository;

    public DisasterEventService(DisasterEventRepository disasterEventRepository) {
        this.disasterEventRepository = disasterEventRepository;
    }
}
