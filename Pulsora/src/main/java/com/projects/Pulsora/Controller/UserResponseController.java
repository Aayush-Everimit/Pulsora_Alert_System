package com.projects.Pulsora.Controller;

import com.projects.Pulsora.Entity.UserResponse;
import com.projects.Pulsora.Service.UserResponseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserResponseController
{
    private final UserResponseService userResponseService;

    public UserResponseController(UserResponseService userResponseService) {
        this.userResponseService = userResponseService;
    }

    @GetMapping("/user-responses")
    public List<UserResponse> getAllUserResponses()
    {
        return userResponseService.getAllUserResponses();
    }
    @GetMapping("/user-responses/{id}")
    public ResponseEntity<UserResponse> getUserResponseById(@PathVariable Long id)
    {
        return userResponseService.getUserResponseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/user-responses")
    public ResponseEntity<UserResponse> submitUserResponse(@RequestBody UserResponse userResponse)
    {
        UserResponse savedResponse = userResponseService.submitResponse(userResponse);
        return ResponseEntity.ok(savedResponse);
    }

    @PutMapping("/user-responses/{id}")
    public ResponseEntity<UserResponse> updateResponse(@PathVariable Long id, @RequestBody UserResponse userResponse)
    {
        return userResponseService.updateResponse(id, userResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/user-responses/{id}")
    public ResponseEntity<String> deleteResponse(@PathVariable Long id)
    {
        return userResponseService.deleteResponse(id);
    }
}
