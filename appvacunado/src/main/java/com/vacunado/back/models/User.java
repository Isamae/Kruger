package com.vacunado.back.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.persistence.UniqueConstraint;


@Entity
@Table(	name = "users", 
uniqueConstraints = { 
	@UniqueConstraint(columnNames = "username"),
	@UniqueConstraint(columnNames = "email") 
})
public class User implements Serializable{
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(max = 20)
	private String username;
	private String name;
	private String lastname;
	@NotBlank
	@Size(max = 50)
	@Email
	private String email;
	@NotBlank
	@Size(max = 10)
	private String CI;
	private LocalDate brithdate;
	private String address;
	private String movil;
	@NotBlank
	private String password;
	@Enumerated(EnumType.STRING)
	private EStatusVaccinated vaccinated;
	
	@OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "user")
	private DoseVaccine dosevaccine;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	public User() {
		vaccinated = EStatusVaccinated.NoVacunado;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getAddress() {
		return this.address;
	}
	
	public void setBrithdate(LocalDate brithDate) {
		this.brithdate = brithDate;
	}
	
	public LocalDate getBrithDate() {
		return this.brithdate;
	}
	
	public void setCI(String cI) {
		this.CI = cI;
	}
	
	public String getCI() {
		return CI;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	public String getLastname() {
		return this.lastname;
	}
	
	public void setMovil(String movil) {
		this.movil = movil;
	}
	
	public String getMovil() {
		return this.movil;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
	public DoseVaccine getDosevaccine() {
		return dosevaccine;
	}
	
	public void setDosevaccine(DoseVaccine dosevaccine) {
		this.dosevaccine = dosevaccine;
	}
	
	public void setVaccinated(EStatusVaccinated vaccinated) {
		this.vaccinated = vaccinated;
	}
	
	public EStatusVaccinated getVaccinated() {
		return this.vaccinated;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public LocalDate getBrithdate() {
		return this.brithdate;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String userName) {
		this.username = userName;
	}
	
	public Set<Role> getRoles() {
		return this.roles;
	}
	
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
}
