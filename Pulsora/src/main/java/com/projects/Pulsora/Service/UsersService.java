package com.projects.Pulsora.Service;

import com.projects.Pulsora.Repository.UsersRepository;
import org.springframework.stereotype.Service;

@Service
public class UsersService
{
    private final UsersRepository usersRepository;
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

}
