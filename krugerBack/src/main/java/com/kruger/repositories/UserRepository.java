package com.kruger.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kruger.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	@Query("select * from User u left join DoseVaccine d where u.vaccinated = :value")
    List<User> findUserByVaccinated(@Param("value") String value);
	
	@Query("select * from User u left join DoseVaccine d where d.typeVaccine = :value")
    List<User> findUserByTypeVaccine(@Param("value") String value);
    
    @Query("select * from User u left join DoseVaccine d where d.dateVaccined >= :start and  d.dateVaccined <= :end")
    List<User> findUserByDateVaccined(@Param("start") Date startdate,@Param("end") Date finishdate);
    
    Optional<User> findByUsername(String userName);
    
    Boolean existsByUsername(String username);
    
    Boolean existsByEmail(String email);
    
    Boolean existsByCI(String CI);

}
