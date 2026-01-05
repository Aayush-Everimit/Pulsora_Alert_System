package com.projects.Pulsora.Controller;

import com.projects.Pulsora.Entity.UserResponse;
import com.projects.Pulsora.Entity.UserResponse_dto;
import com.projects.Pulsora.Service.UserResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user-responses")
public class UserResponseController {

    private final UserResponseService userResponseService;

    @PostMapping
    public ResponseEntity<UserResponse_dto> submitUserResponse(
            @RequestBody UserResponse_dto request
    ) {
        UserResponse response = userResponseService.submitResponse(
                request.getUserId(),
                request.getDisasterEventId(),
                request.getResponseType(),
                request.getDescription()
        );

        UserResponse_dto responseDto = new UserResponse_dto(
                response.getUser().getId(),
                response.getDisasterEvent().getId(),
                response.getResponse(), // ✅ enum type matches DTO
                response.getDescription()
        );

        return ResponseEntity.ok(responseDto);
    }



    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllResponses() {
        return ResponseEntity.ok(userResponseService.getAllResponses());
    }
}
