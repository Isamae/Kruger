package com.vacunado.back.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.vacunado.back.models.User;

public interface IUserService {
	public List<User> findUserByTypeVaccine(String value);
	public List<User> findUserByDateVaccined(Date start, Date end);
	public Optional<User> findByUsername(String userName);
	public Optional<User> findByEmail(String email);
	public Optional<User> findByCI(String cI);
	public User save(User user);
	public List<User> findAll();
	public void deleteById(Long id);
	public Optional<User> findById(Long id);
	public List<User> findUserByVaccinated(String type);
}
