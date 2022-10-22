package com.vacunado.back.payload.request;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.vacunado.back.models.DoseVaccine;


public class SignupRequest{

	private String username;
	private String name;
	private String lastname;
	private String email;
	private String CI;
	private Date brithDate;
	private String address;
	private String movil;
	private String password;
	private String vaccinated;
	private DoseVaccine doseVaccine;
	private Set<String> roles = new HashSet<>();
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setBrithDate(Date brithDate) {
		this.brithDate = brithDate;
	}
	
	public Date getBrithDate() {
		return brithDate;
	}
	
	public void setCI(String cI) {
		CI = cI;
	}
	
	public String getCI() {
		return CI;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	public String getLastname() {
		return lastname;
	}
	
	public void setMovil(String movil) {
		this.movil = movil;
	}
	
	public String getMovil() {
		return movil;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public DoseVaccine getDoseVaccine() {
		return doseVaccine;
	}
	
	public void setDoseVaccine(DoseVaccine doseVaccine) {
		this.doseVaccine = doseVaccine;
	}
	
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public Set<String> getRoles() {
		return roles;
	}
	
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	
	public String getVaccinated() {
		return vaccinated;
	}
	
	public void setVaccinated(String vaccinated) {
		this.vaccinated = vaccinated;
	}

}
