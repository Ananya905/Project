package com.csms.carsellingapp.controller;


import com.csms.carsellingapp.dto.UserDto;
import com.csms.carsellingapp.entity.User;
import com.csms.carsellingapp.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> retrieveAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/users/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto userDto) {
        System.out.println(userDto.getEmail());
        System.out.println(userDto.getPassword());
        return new ResponseEntity<>(userService.loginUser(userDto), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> retrieveSingleUser(@PathVariable Integer id) {
        return new ResponseEntity<>(userService.getSingleUser(id), HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<?> registerNewUser(@RequestBody User user) throws IOException {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }


    @PutMapping("/users/{userId}")
    public ResponseEntity<?> modifyUserDetails(
            @PathVariable Integer userId,
            @RequestBody User user,
            @RequestParam(value = "isSeller", required = false) String isSeller
    ) {
        return new ResponseEntity<>(userService.updateUser(userId, user, isSeller), HttpStatus.OK);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> removeUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>("User deleted successfully...", HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/upload/image")
    public ResponseEntity<?> uploadUserProfileImage(
            @PathVariable Integer userId,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        userService.uploadUserProfileImage(userId, image);
        return new ResponseEntity<>("Image Uploaded successfully!!", HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}/download/image")
    public ResponseEntity<?> downloadProfileImage(@PathVariable Integer userId, HttpServletResponse response) throws IOException {
        byte[] imageArray = userService.downloadImage(userId);
        if (imageArray == null) throw new RuntimeException("No image");
        ByteArrayInputStream inputStream = new ByteArrayInputStream(imageArray);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        int copy = StreamUtils.copy(inputStream, response.getOutputStream());
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
