package com.csms.carsellingapp;

import com.csms.carsellingapp.entity.Role;
import com.csms.carsellingapp.respository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@SpringBootApplication
public class CarSellingAppApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(CarSellingAppApplication.class, args);
    }

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {

        //setting default roles with ID's on the start of the application
        Role role1 = new Role();
        role1.setId(600);
        role1.setRole("ROLE_SELLER");

        Role role2 = new Role();
        role2.setId(601);
        role2.setRole("ROLE_BUYER");

        List<Role> roles = List.of(role1, role2);

        roleRepository.saveAllAndFlush(roles);
        
    }

    @Bean
    public WebMvcConfigurer configurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("*")
                        .allowedHeaders("*")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*")
                        .maxAge(3600L);
            }
        };
    }
}
