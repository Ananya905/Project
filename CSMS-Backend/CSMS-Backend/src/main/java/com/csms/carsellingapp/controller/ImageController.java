package com.csms.carsellingapp.controller;

import com.csms.carsellingapp.respository.ImageRepository;
import com.csms.carsellingapp.service.ImageService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ImageController {

    @Autowired
    private ImageService imageService;
    @Autowired
    private ImageRepository imageRepository;

    @PostMapping("/upload/{carId}/images")
    public ResponseEntity<?> uploadImages(
            @PathVariable Integer carId,
            @RequestParam("images") MultipartFile[] images
    ) throws IOException {
        imageService.uploadImage(carId, images);
        return new ResponseEntity<>("Image uploaded successfully!!", HttpStatus.CREATED);
    }

    @GetMapping("/download/image/{imageId}")
    public ResponseEntity<?> downloadImage(@PathVariable Integer imageId, HttpServletResponse response) throws IOException {
        byte[] imageArray = imageService.downloadImage(imageId);
        ByteArrayInputStream inputStream = new ByteArrayInputStream(imageArray);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(inputStream, response.getOutputStream());
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @GetMapping("/download/images")
    public ResponseEntity<?> downloadAllImage(HttpServletResponse response) throws IOException {
        List<String> imageUrl = imageRepository.findAll()
                .stream()
                .map(image -> {
                    return ServletUriComponentsBuilder
                            .fromCurrentContextPath()
                            .path("/api/v1/download/image/")
                            .path(String.valueOf(image.getId()))
                            .toUriString();
                }).collect(Collectors.toList());
        System.out.println(imageUrl);
        return new ResponseEntity<>(imageUrl, HttpStatus.OK);
    }

    @GetMapping("/download/{carId}/images")
    public ResponseEntity<?> retrieveAllImagesByCarDetails(@PathVariable Integer carId) throws FileNotFoundException {
        var imageUrl = imageService.downloadImagesByCarDetails(carId).stream().map(image -> {
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/download/image/")
                    .path(String.valueOf(image.getId()))
                    .toUriString();
        }).toList();
        return new ResponseEntity<>(imageUrl, HttpStatus.OK);
    }

}
