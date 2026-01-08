package com.electricity.billing.service;

import com.electricity.billing.dto.LoginRequest;
import com.electricity.billing.model.User;
import com.electricity.billing.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public AuthService(UserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public User login(LoginRequest request) {
        User user = repo.findByUsername(request.getUsername());
        if (user != null && encoder.matches(request.getPassword(), user.getPassword())) {
            return user;
        }
        throw new RuntimeException("Invalid credentials");
    }
}
