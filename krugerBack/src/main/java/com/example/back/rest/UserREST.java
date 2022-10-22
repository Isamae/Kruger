package com.example.back.rest;

import java.net.URI;
import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kruger.models.DoseVaccine;
import com.kruger.models.User;
import com.kruger.repositories.DoseVaccineRepository;
import com.kruger.repositories.UserRepository;
import com.kruger.models.EVaccine;

@CrossOrigin(origins = "*", maxAge = 3600, methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/api/user")
public class UserREST {
	
	@Autowired
	private UserRepository userService;
	
	@Autowired
	private DoseVaccineRepository doseVaccioneService;
	
	@GetMapping("/")
	private ResponseEntity<List<User>> getAllUsers (){
		return ResponseEntity.ok(userService.findAll());
	}
	
	@PostMapping("/")
	private ResponseEntity<User> saveUser (@RequestBody User user){
		try {
			User saveuser = userService.save(user);		
			return ResponseEntity.created(new URI("/user/"+saveuser.getId())).body(saveuser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@DeleteMapping (value = "/delete/{id}")
	private ResponseEntity<Boolean> deleteUser (@PathVariable ("id") Long id){
		userService.deleteById(id);
		return ResponseEntity.ok(!(userService.findById(id)!=null));
	}
	
	@PostMapping("/update")
	@Transactional(rollbackFor = JsonMappingException.class)
	public User updateUser(@Validated @RequestBody String json) throws JsonMappingException, JsonProcessingException {
	
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(json);
		DoseVaccine doseVaccine = new DoseVaccine();
		
		User user = userService.findById(jsonNode.get("user").get("id").asLong()).get();
		doseVaccine.setTypeVaccine(EVaccine.valueOf(jsonNode.get("vaccine").get("type").asText()));
		user.setDoseVaccine(doseVaccine);
		doseVaccine.setUser(user);
		doseVaccioneService.save(doseVaccine);
		
		return userService.save(user);
	}
	
	@PostMapping("/filter")
	public List<User> filterUser(@RequestBody Map<String, String> filter) {
		if(filter.values().contains("dateStar")) {
			return userService.findUserByDateVaccined(Date.valueOf(filter.get("dateStar")), Date.valueOf(filter.get("dateEnd")));
		}
		else if(filter.values().contains("typeVaccine")) {
			return userService.findUserByTypeVaccine(filter.get("typeVaccine"));
		}
		else {
			return userService.findUserByVaccinated(filter.get("vaccinated"));
		}

	}
}
