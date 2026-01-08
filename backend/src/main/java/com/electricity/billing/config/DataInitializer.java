package com.electricity.billing.config;

import com.electricity.billing.model.User;
import com.electricity.billing.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Initializing data...");

        // Create admin user if it doesn't exist
        User existingAdmin = userRepository.findByUsername("admin");
        if (existingAdmin == null) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("✅ Admin user created: username='admin', password='admin123'");
        } else {
            System.out.println("ℹ️ Admin user already exists");
        }

        // Create demo user if it doesn't exist
        User existingUser = userRepository.findByUsername("user");
        if (existingUser == null) {
            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("1234"));
            user.setRole("USER");
            userRepository.save(user);
            System.out.println("✅ Demo user created: username='user', password='1234'");
        } else {
            System.out.println("ℹ️ Demo user already exists");
        }

        System.out.println("Data initialization completed!");
    }
}