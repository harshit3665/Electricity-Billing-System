package com.electricity.billing.repository;

import com.electricity.billing.model.MonthlyUsage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UsageRepository extends MongoRepository<MonthlyUsage, String> {
    List<MonthlyUsage> findByUsername(String username);
}
