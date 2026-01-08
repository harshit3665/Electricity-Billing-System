package com.electricity.billing.repository;

import com.electricity.billing.model.ElectricComponent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ComponentRepository extends MongoRepository<ElectricComponent, String> {
}
