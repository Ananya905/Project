package com.csms.carsellingapp.service;


import com.csms.carsellingapp.entity.CarDetails;
import com.csms.carsellingapp.entity.Image;
import com.csms.carsellingapp.respository.CarDetailsRepository;
import com.csms.carsellingapp.respository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    public void uploadImage(Integer carId, MultipartFile[] images) {
        CarDetails carDetails = carDetailsRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car details not found"));
        Arrays.stream(images).forEach(image -> {
            try {
                Image imageEntity = new Image();
                imageEntity.setName(image.getName());
                imageEntity.setContentType(image.getContentType());
                imageEntity.setData(image.getBytes());
                imageEntity.setCarDetails(carDetails);
                imageRepository.save(imageEntity);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public byte[] downloadImage(Integer imageId) throws FileNotFoundException {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        return image.getData();
    }

    public List<Image> downloadImagesByCarDetails(Integer carId) throws FileNotFoundException {
        CarDetails carDetails = carDetailsRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));
        return imageRepository.findByCarDetails(carDetails);
    }
}
