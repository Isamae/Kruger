package com.kruger.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kruger.models.DoseVaccine;
@Repository
public interface DoseVaccineRepository extends JpaRepository<DoseVaccine, Long>{
	
}
