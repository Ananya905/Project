package com.csms.carsellingapp.controller;

import com.csms.carsellingapp.dto.UserDto;
import com.csms.carsellingapp.entity.Admin;
import com.csms.carsellingapp.respository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;
                                         
    @PostMapping("/admin/login")
    public ResponseEntity<?> authenticateBuyer(@RequestBody UserDto userDto) {
        Admin admin = adminRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (admin.getPassword().equals(userDto.getPassword())) {
            return new ResponseEntity<>(admin, HttpStatus.OK);
        } else {
            throw new RuntimeException("Incorrect Password");
        }
    }
}
