package com.projects.Pulsora.Service;

import com.projects.Pulsora.Entity.UserResponse;
import com.projects.Pulsora.Repository.UserResponseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserResponseService
{
    private final UserResponseRepository userResponseRepository;
    public UserResponseService(UserResponseRepository userResponseRepository)
    {
        this.userResponseRepository = userResponseRepository;
    }

    public List<UserResponse> getAllUserResponses() {
        return userResponseRepository.findAll();
    }

    public Optional<UserResponse> getUserResponseById(Long id) {
        return userResponseRepository.findById(id);
    }

    public UserResponse submitResponse(UserResponse userResponse) {
        return userResponseRepository.save(userResponse);
    }


    public Optional<UserResponse> updateResponse(Long id, UserResponse userResponse) {
        return userResponseRepository.findById(id).map(existingResponse -> {

            existingResponse.setDisasterEvent(userResponse.getDisasterEvent());
            existingResponse.setResponse(userResponse.getResponse());
            return userResponseRepository.save(existingResponse);
        });
    }

    public ResponseEntity<String> deleteResponse(Long id) {
        if(userResponseRepository.existsById(id)) {
        userResponseRepository.deleteById(id);
            return ResponseEntity.ok("User deleted");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        }
}
