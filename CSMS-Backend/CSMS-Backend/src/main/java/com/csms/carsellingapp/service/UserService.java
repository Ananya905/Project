package com.csms.carsellingapp.service;


import com.csms.carsellingapp.dto.UserDto;
import com.csms.carsellingapp.entity.Role;
import com.csms.carsellingapp.entity.User;
import com.csms.carsellingapp.respository.RoleRepository;
import com.csms.carsellingapp.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User saveUser(User user) {
        Role role = roleRepository.findById(601)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        //adding default role i.e. 'buyer'
        user.getRoles().add(role);
        return userRepository.save(user);
    }

    public User loginUser(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getPassword().equals(userDto.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Password is Incorrect");
        }
    }

    public User getSingleUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Integer userId, User newUser, String isSeller) {
        System.out.println(isSeller);
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setName(newUser.getName());
        existingUser.setEmail(newUser.getEmail());
        existingUser.setPassword(newUser.getPassword());
        existingUser.setCity(newUser.getCity());
        existingUser.setAddress(newUser.getAddress());
        existingUser.setPhone(newUser.getPhone());
        if (isSeller.equals("seller")) {
            List<Role> roles = roleRepository.findAll();
            existingUser.getRoles().addAll(roles);
        }
        User updatedUser = userRepository.save(existingUser);
        return updatedUser;
    }

    public void deleteUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

    public void uploadUserProfileImage(Integer userId, MultipartFile image) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        user.setImage(image.getBytes());
        userRepository.save(user);
    }

    public byte[] downloadImage(Integer userId) throws FileNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        return user.getImage();
    }
}
