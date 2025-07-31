package com.csms.carsellingapp.respository;

import com.csms.carsellingapp.entity.Bidding;
import com.csms.carsellingapp.entity.CarDetails;
import com.csms.carsellingapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BiddingRepository extends JpaRepository<Bidding, Integer> {

    public List<Bidding> findByCarDetails(CarDetails carDetails);

    public List<Bidding> findByUser(User user);
}
