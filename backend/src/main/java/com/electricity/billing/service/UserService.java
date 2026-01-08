package com.electricity.billing.service;

import com.electricity.billing.model.MonthlyUsage;
import com.electricity.billing.repository.UsageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UsageRepository repo;

    public UserService(UsageRepository repo) {
        this.repo = repo;
    }

    public List<MonthlyUsage> getMyUsage(String username) {
        return repo.findByUsername(username);
    }
}
