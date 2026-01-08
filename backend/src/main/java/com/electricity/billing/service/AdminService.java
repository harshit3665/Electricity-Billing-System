package com.electricity.billing.service;

import com.electricity.billing.model.ElectricComponent;
import com.electricity.billing.model.MonthlyUsage;
import com.electricity.billing.model.User;
import com.electricity.billing.repository.ComponentRepository;
import com.electricity.billing.repository.UsageRepository;
import com.electricity.billing.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepo;
    private final ComponentRepository componentRepo;
    private final UsageRepository usageRepo;
    private final BCryptPasswordEncoder encoder;

    public AdminService(UserRepository userRepo,
                        ComponentRepository componentRepo,
                        UsageRepository usageRepo,
                        BCryptPasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.componentRepo = componentRepo;
        this.usageRepo = usageRepo;
        this.encoder = encoder;
    }

  public User createUser(User user) {
    if (userRepo.findByUsername(user.getUsername()) != null) {
        throw new RuntimeException("Username already exists");
    }

    user.setPassword(encoder.encode(user.getPassword()));
    user.setRole("USER");
    return userRepo.save(user);
}


    public ElectricComponent addComponent(ElectricComponent component) {
        return componentRepo.save(component);
    }

    public MonthlyUsage addUsage(MonthlyUsage usage) {
        return usageRepo.save(usage);
    }

    public List<MonthlyUsage> getUserUsage(String username) {
        return usageRepo.findByUsername(username);
    }

    public List<MonthlyUsage> getAllUsages() {
        return usageRepo.findAll();
    }
