package com.electricity.billing.controller;

import com.electricity.billing.dto.LoginRequest;
import com.electricity.billing.dto.LoginResponse;
import com.electricity.billing.model.User;
import com.electricity.billing.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

   @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {
    User user = authService.login(request);
    return new LoginResponse(user.getUsername(), user.getRole());
}

}
