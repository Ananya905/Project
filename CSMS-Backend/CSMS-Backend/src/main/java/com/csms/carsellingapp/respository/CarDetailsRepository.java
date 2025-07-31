package com.csms.carsellingapp.respository;

import com.csms.carsellingapp.entity.Bidding;
import com.csms.carsellingapp.entity.CarDetails;
import com.csms.carsellingapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CarDetailsRepository extends JpaRepository<CarDetails, Integer> {

    List<CarDetails> findByUser(User user);

    List<CarDetails> findByBrandContaining(String keyword);
}
