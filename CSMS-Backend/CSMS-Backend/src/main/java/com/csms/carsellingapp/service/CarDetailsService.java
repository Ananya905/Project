package com.csms.carsellingapp.service;


import com.csms.carsellingapp.entity.Bidding;
import com.csms.carsellingapp.entity.CarDetails;
import com.csms.carsellingapp.entity.Image;
import com.csms.carsellingapp.entity.User;
import com.csms.carsellingapp.respository.BiddingRepository;
import com.csms.carsellingapp.respository.CarDetailsRepository;
import com.csms.carsellingapp.respository.ImageRepository;
import com.csms.carsellingapp.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarDetailsService {

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ImageRepository imageRepository;

    public CarDetails getSingleCarDetails(Integer carId) {
        return carDetailsRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found with the provided details!!"));
    }

    public List<CarDetails> getAllCarDetails() {
        return carDetailsRepository.findAll(); 
    }

    public CarDetails createCarDetails(CarDetails carDetails, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        carDetails.setUser(user);
        return carDetailsRepository.save(carDetails);
    }

    public CarDetails updateCarDetails(CarDetails carDetails, Integer carId) {
        CarDetails existingCarDetails = carDetailsRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car details not found!!"));
        existingCarDetails.setBrand(carDetails.getBrand());
        existingCarDetails.setModel(carDetails.getModel());
        existingCarDetails.setInsurance(carDetails.isInsurance());
        existingCarDetails.setOwnership(carDetails.getOwnership());
        existingCarDetails.setVariant(carDetails.getVariant());
        existingCarDetails.setYear(carDetails.getYear());
        return carDetailsRepository.save(existingCarDetails);
    }

    public void deleteCarDetails(Integer carId) {
        CarDetails carDetails = carDetailsRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car details not found"));
        carDetailsRepository.delete(carDetails);
    }

    public List<CarDetails> getAllCarsByUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return carDetailsRepository.findByUser(user);
    }

    //search api's

    public List<CarDetails> searchByBrandName(String keyword){
        return carDetailsRepository.findByBrandContaining(keyword);
    }
}
