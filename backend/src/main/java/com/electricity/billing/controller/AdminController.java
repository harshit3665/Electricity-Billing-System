package com.electricity.billing.controller;

import com.electricity.billing.model.ElectricComponent;
import com.electricity.billing.model.MonthlyUsage;
import com.electricity.billing.model.User;
import com.electricity.billing.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Create user
    @PostMapping("/create-user")
    public User createUser(@RequestBody User user) {
        return adminService.createUser(user);
    }

    // Add electric component
    @PostMapping("/add-component")
    public ElectricComponent addComponent(@RequestBody ElectricComponent component) {
        return adminService.addComponent(component);
    }

    // Add monthly usage (auto-calculated bill)
    @PostMapping("/add-usage")
    public MonthlyUsage addUsage(@RequestBody MonthlyUsage usage) {
        return adminService.addUsage(usage);
    }

    // Get user usage history
    @GetMapping("/usage/{username}")
    public List<MonthlyUsage> getUserUsage(@PathVariable String username) {
        return adminService.getUserUsage(username);
    }

    // Get all usages
    @GetMapping("/all-usages")
    public List<MonthlyUsage> getAllUsages() {
        return adminService.getAllUsages();
    }
