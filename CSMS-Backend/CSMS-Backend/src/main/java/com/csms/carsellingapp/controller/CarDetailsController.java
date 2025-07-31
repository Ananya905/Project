package com.csms.carsellingapp.controller;

import com.csms.carsellingapp.entity.CarDetails;
import com.csms.carsellingapp.service.CarDetailsService;
import com.csms.carsellingapp.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CarDetailsController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private CarDetailsService carDetailsService;

    @GetMapping("/cars/{carId}")
    public ResponseEntity<?> retrieveSingleCarDetails(@PathVariable Integer carId) {
        return new ResponseEntity<>(carDetailsService.getSingleCarDetails(carId), HttpStatus.OK);
    }

    @GetMapping("/cars")
    public ResponseEntity<?> retrieveAllCarDetails() {
        return new ResponseEntity<>(carDetailsService.getAllCarDetails(), HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/cars")
    public ResponseEntity<?> createNewCarDetails(
            @RequestBody CarDetails carDetails,
            @PathVariable Integer userId
    ) {
        return new ResponseEntity<>(carDetailsService.createCarDetails(carDetails, userId), HttpStatus.CREATED);
    }

    @PutMapping("/cars/{carId}")
    public ResponseEntity<?> updateTheCarDetails(
            @RequestBody CarDetails carDetails,
            @PathVariable Integer carId
    ) {
        return new ResponseEntity<>(carDetailsService.updateCarDetails(carDetails, carId), HttpStatus.OK);
    }

    @DeleteMapping("/cars/{carId}")
    public ResponseEntity<?> removeTheCarDetails(@PathVariable Integer carId) {
        carDetailsService.deleteCarDetails(carId);
        return new ResponseEntity<>("Car details removed successfully!!", HttpStatus.OK);
    }

    @GetMapping("/users/{userId}/cars")
    public ResponseEntity<?> retrieveAllCarDetailsByUser(@PathVariable Integer userId) {
        return new ResponseEntity<>(carDetailsService.getAllCarsByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/cars/search")
    public ResponseEntity<?> retrieveAllCarDetailsByBrandName(
            @RequestParam(value = "keyword", required = false) String keyword
    ) {
        return new ResponseEntity<>(carDetailsService.searchByBrandName(keyword), HttpStatus.OK);
    }
}