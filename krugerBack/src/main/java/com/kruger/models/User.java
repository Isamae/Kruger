package com.kruger.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name="user",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = "username"),
				@UniqueConstraint(columnNames = "email"),
				@UniqueConstraint(columnNames = "CI")
		})
public class User {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	private Date brithdate;
	private String address;
	private String movil;
	@NotBlank
	private String password;
	@Enumerated(EnumType.STRING)
	private EStatusVaccinated vaccinated;
	@OneToOne(mappedBy="user")
	private DoseVaccine dosevaccine;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles",
			joinColumns = @JoinColumn(name = "id_user"),
			inverseJoinColumns = @JoinColumn(name = "id_role"))
	private Set<Role> roles = new HashSet<>();
	
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
	
	public void setBrithdate(Date brithDate) {
		this.brithdate = brithDate;
	}
	
	public Date getBrithDate() {
		return brithdate;
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
		return dosevaccine;
	}
	
	public void setDoseVaccine(DoseVaccine doseVaccine) {
		this.dosevaccine = doseVaccine;
	}
	
	public void setVaccinated(EStatusVaccinated vaccinated) {
		this.vaccinated = vaccinated;
	}
	
	public EStatusVaccinated getVaccinated() {
		return vaccinated;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	public Set<Role> getRoles() {
		return roles;
	}
	
	public void setUsername(String userName) {
		this.username = userName;
	}
	
	public String getUserName() {
		return username;
	}
	
}
