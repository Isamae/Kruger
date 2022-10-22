package com.vacunado.back.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.vacunado.back.models.User;
import com.vacunado.back.repositories.UserRepository;

@Service
public class UserService implements IUserService{
	@Autowired
	UserRepository repository;
	
	@Override
	public List<User> findUserByTypeVaccine(String value){
		return this.repository.findUserByTypeVaccine(value);
	}
	
	@Override
	public List<User> findUserByDateVaccined(Date start, Date end){
		return this.repository.findUserByDateVaccined(start,end);
	}
	
	@Override
	public Optional<User> findByUsername(String userName){
		return this.repository.findByUsername(userName);
	}
	
	@Override
	public Optional<User> findByEmail(String email){
		return this.repository.findByEmail(email);
	}
	
	@Override
	public Optional<User> findByCI(String cI){
		return this.repository.findByCI(cI);
	}
	
	@Override
	public User save(User user){
		return this.repository.save(user);
	}
	
	@Override
	public List<User> findAll(){
		return this.repository.findAll();
	}
	
	@Override
	public void deleteById(Long id) {
		this.repository.deleteById(id);
	}
	
	@Override
	public Optional<User> findById(Long id) {
		return repository.findById(id);
	}
	
	@Override
	public List<User> findUserByVaccinated(String type) {
		return this.repository.findUserByVaccinated(type);
	}
	
	public UserRepository getRepository() {
		return this.repository;
	}
}
