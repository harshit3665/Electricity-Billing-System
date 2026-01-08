package com.electricity.billing.controller;

import com.electricity.billing.model.MonthlyUsage;
import com.electricity.billing.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/usage/{username}")
    public List<MonthlyUsage> getMyUsage(@PathVariable String username) {
        return userService.getMyUsage(username);
    }
}
