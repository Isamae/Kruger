package com.kruger.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="dosevaccine")
public class DoseVaccine {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Enumerated(EnumType.STRING)
	private EVaccine typeVaccine;
	private int numberDose;
	private Date dateVaccined;
	@OneToOne
	@JoinColumn(name="id_user")
	private User user;
	
	public Date getDateVaccined() {
		return dateVaccined;
	}
	
	public void setDateVaccined(Date dateVaccined) {
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
