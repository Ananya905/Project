package com.csms.carsellingapp.controller;

import com.csms.carsellingapp.entity.Bidding;
import com.csms.carsellingapp.service.BiddingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class BiddingController {

    @Autowired
    private BiddingService biddingService;

    @GetMapping("/biddings")
    public ResponseEntity<?> retrieveAllBidding() {
        return new ResponseEntity<>(biddingService.getAllBidding(), HttpStatus.OK);
    }

    @GetMapping("/biddings/{biddingId}")
    public ResponseEntity<?> retrieveSingleBidding(@PathVariable Integer biddingId) {
        return new ResponseEntity<>(biddingService.getSingleBidding(biddingId), HttpStatus.OK);
    }

    @PostMapping("/user/{userId}/car/{carId}/biddings")
    public ResponseEntity<?> createNewBidding(
            @RequestBody Bidding bidding,
            @PathVariable Integer userId,
            @PathVariable Integer carId
    ) {
        return new ResponseEntity<>(biddingService.createBidding(bidding, carId, userId), HttpStatus.CREATED);
    }

    @DeleteMapping("/biddings/{biddingId}")
    public ResponseEntity<?> removeBidding(@PathVariable Integer biddingId) {
        biddingService.deleteBidding(biddingId);
        return new ResponseEntity<>("Bidding removed successfully!!", HttpStatus.OK);
    }

    @GetMapping("/users/{userId}/biddings")
    public ResponseEntity<?> retrieveAllBiddingByUser(@PathVariable Integer userId) {
        return new ResponseEntity<>(biddingService.getAllBiddingsByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/cars/{carId}/biddings")
    public ResponseEntity<?> retrieveAllBiddingByCarDetails(@PathVariable Integer carId) {
        return new ResponseEntity<>(biddingService.getAllBiddingsByCarDetails(carId), HttpStatus.OK);
    }
}
