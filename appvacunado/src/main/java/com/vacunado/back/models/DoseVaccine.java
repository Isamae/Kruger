package com.vacunado.back.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="dosevaccine")
public class DoseVaccine implements Serializable {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Enumerated(EnumType.STRING)
	private EVaccine typeVaccine;
	private int numberDose;
	private LocalDate dateVaccined;
	//@OneToOne(fetch = FetchType.LAZY, optional = false)
	@OneToOne
    @JoinColumn(name = "user_id", updatable = false, nullable = false)
	private User user;
	
	public DoseVaccine() {
		// TODO Auto-generated constructor stub
	}
	
	public LocalDate getDateVaccined() {
		return dateVaccined;
	}
	
	public void setDateVaccined(LocalDate dateVaccined) {
		this.dateVaccined = dateVaccined;
	}
	
	public int getNumberDose() {
		return numberDose;
	}
	
	public void setNumberDose(int numberDose) {
		this.numberDose = numberDose;
	}
	
	public EVaccine getTypeVaccine() {
		return typeVaccine;
	}
	
	public void setTypeVaccine(EVaccine typeVaccine) {
		this.typeVaccine = typeVaccine;
	}
	
	public Long getId() {
		return id;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
}
