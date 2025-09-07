package com.projects.Pulsora.Service;

import com.projects.Pulsora.Repository.UserResponseRepository;
import org.springframework.stereotype.Service;

@Service
public class UserResponseService
{
    private final UserResponseRepository userResponseRepository;
    public UserResponseService(UserResponseRepository userResponseRepository)
    {
        this.userResponseRepository = userResponseRepository;
    }
}
