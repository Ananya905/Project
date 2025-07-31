package com.csms.carsellingapp.respository;

import com.csms.carsellingapp.entity.CarDetails;
import com.csms.carsellingapp.entity.Image;
import com.csms.carsellingapp.service.ImageService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

    public List<Image> findByCarDetails(CarDetails carDetails);
}
