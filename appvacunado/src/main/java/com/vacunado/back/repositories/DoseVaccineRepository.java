package com.vacunado.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vacunado.back.models.DoseVaccine;


@Repository
public interface DoseVaccineRepository extends JpaRepository<DoseVaccine, Long>{
	
}
