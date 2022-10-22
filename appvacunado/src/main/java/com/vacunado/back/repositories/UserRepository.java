package com.vacunado.back.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vacunado.back.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	@Query("SELECT u FROM User u JOIN DoseVaccine d WHERE u.vaccinated = :value")
    List<User> findUserByVaccinated(@Param("value") String value);
	
	@Query("Select u from User u JOIN DoseVaccine d where d.typeVaccine = :value")
    List<User> findUserByTypeVaccine(@Param("value") String value);
    
    @Query("Select u from User u JOIN DoseVaccine d where d.dateVaccined >= ?1 and  d.dateVaccined <= ?2")
    List<User> findUserByDateVaccined(Date start, Date end);
    
    Optional<User> findByUsername(String userName);
    
    Optional<User> findByEmail(String email);

    Optional<User> findByCI(String cI); 
    
}
