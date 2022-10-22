package com.vacunado.back.rest;


import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vacunado.back.models.DoseVaccine;
import com.vacunado.back.models.ERole;
import com.vacunado.back.models.EStatusVaccinated;
import com.vacunado.back.models.EVaccine;
import com.vacunado.back.models.Role;
import com.vacunado.back.models.User;
import com.vacunado.back.payload.response.MessageResponse;
import com.vacunado.back.repositories.DoseVaccineRepository;
import com.vacunado.back.repositories.RoleRepository;
import com.vacunado.back.repositories.UserRepository;


@CrossOrigin(origins = "*", maxAge = 3600, methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/api/user")
public class UserREST {
	
	@Autowired
	private DoseVaccineRepository doseVaccioneService;
	
	@Autowired
	private UserRepository  userService;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	 		
	@GetMapping("/all")
	private ResponseEntity<List<User>> getAllUsers(){
		return ResponseEntity.ok(userService.findAll());
	}
	
	@GetMapping("/edit/{id}")
	private ResponseEntity<User> getUser(@PathVariable Long id){
		return ResponseEntity.ok(userService.findById(id).get());
	}
	
	@PostMapping("/save") 
	private ResponseEntity<?> saveUser(@Validated @RequestBody String saveUser) throws JsonMappingException, JsonProcessingException{ 
		 try { 
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(saveUser);
			if(!userService.findByEmail(jsonNode.get("email").asText()).isEmpty() ) {
				return ResponseEntity
						.badRequest().body(new MessageResponse("Error: Email is already taken!"));
			}
			
			if(!userService.findByCI(jsonNode.get("ci").asText()).isEmpty()) {
				return ResponseEntity
						.badRequest()
						.body(new MessageResponse("Error: CI is already taken!")); 
			}
			
			User user = new User();
			user.setName(jsonNode.get("name").asText());
			user.setUsername(jsonNode.get("ci").asText());
			user.setLastname(jsonNode.get("lastname").asText());
			user.setEmail(jsonNode.get("email").asText());
			user.setCI(jsonNode.get("ci").asText());
			user.setPassword(encoder.encode(jsonNode.get("password").asText()));
				
			Set<Role> roles = new HashSet<>();
			jsonNode.get("roles").elements().forEachRemaining(role -> {
			
				switch(role.get("value").asText()) {
					case "admin":
						Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error:Role is no found"));
						roles.add(adminRole);
						break;
					default:
						Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(()-> new RuntimeException("Error:Role is no found"));
						roles.add(userRole);
				}
			});
			
			user.setRoles(roles);
			User saveuser = userService.save(user);
			 
		 	return  ResponseEntity.created(new URI("/user/"+saveuser.getId())).body(saveuser); }
		 catch (Exception e) { 
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); 
		} 
	}
	
	@DeleteMapping (value = "/delete/{id}") 
	private ResponseEntity<Boolean> deleteUser (@PathVariable ("id") Long id){ 
		userService.deleteById(id); 
		return ResponseEntity.ok(!(userService.findById(id)!=null)); 
	}
	  
	 
	@PutMapping("/update")
	public ResponseEntity<?> updateUser(@Validated @RequestBody String updateUser) throws JsonMappingException, JsonProcessingException, URISyntaxException{	  
		//userService.deleteAllInBatch();
		//doseVaccioneService.deleteAllInBatch();
		
		
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(updateUser);
		System.out.println(jsonNode);
		User user = userService.getById(jsonNode.get("id").asLong());
		
		user.setName(jsonNode.get("name").asText());
		user.setLastname(jsonNode.get("lastname").asText());
		user.setAddress(jsonNode.get("address").asText());
		user.setCI(jsonNode.get("ci").asText());	
		user.setEmail(jsonNode.get("email").asText());
		user.setPassword(encoder.encode(jsonNode.get("password").asText()));
		user.setMovil(jsonNode.get("movil").asText());
		
		if(jsonNode.get("dosevaccine").asText()!="null") {
			if(jsonNode.get("dosevaccine").has("id")) {
				DoseVaccine doseVaccine = doseVaccioneService.getById(jsonNode.get("dosevaccine").get("id").asLong());
				if(jsonNode.get("dosevaccine").has("dateVaccined")) {
					doseVaccine.setDateVaccined(LocalDate.parse(jsonNode.get("dosevaccine").get("dateVaccined").asText()));
				}
				if(jsonNode.get("dosevaccine").has("numberDose")) {
					doseVaccine.setNumberDose(jsonNode.get("dosevaccine").get("numberDose").asInt());
				}
				
				if(jsonNode.get("dosevaccine").has("numberDose")) {
					doseVaccine.setTypeVaccine(EVaccine.valueOf(jsonNode.get("dosevaccine").get("typeVaccine").get("value").asText()));
				}
				
				doseVaccine.setUser(user);
				//user.setDosevaccine(doseVaccine);
				//doseVaccioneService.save(doseVaccine);
			}
			else {
				DoseVaccine doseVaccine = new DoseVaccine();
				if(jsonNode.get("dosevaccine").has("dateVaccined")) {
					doseVaccine.setDateVaccined(LocalDate.parse(jsonNode.get("dosevaccine").get("dateVaccined").asText()));
				}
				if(jsonNode.get("dosevaccine").has("numberDose")) {
					doseVaccine.setNumberDose(jsonNode.get("dosevaccine").get("numberDose").asInt());
				}
				
				if(jsonNode.get("dosevaccine").has("numberDose")) {
					doseVaccine.setTypeVaccine(EVaccine.valueOf(jsonNode.get("dosevaccine").get("typeVaccine").get("value").asText()));
				}
				
				user.setDosevaccine(doseVaccine);
				doseVaccine.setUser(user);
				
				
			}
			user.setVaccinated(EStatusVaccinated.valueOf(jsonNode.get("vaccinated").asText()));
		}
		
		if(jsonNode.get("brithdate").asText()!="null") {
			
			user.setBrithdate(LocalDate.parse(jsonNode.get("brithdate").asText()));
		}
		Set<Role> roles = new HashSet<>();
		jsonNode.get("roles").elements().forEachRemaining(role -> {
		
			switch(role.get("value").asText()) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error:Role is no found"));
					roles.add(adminRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
						.orElseThrow(()-> new RuntimeException("Error:Role is no found"));
					roles.add(userRole);
			}
		});
		
		user.setRoles(roles);
		User saveuser = userService.save(user);
	 	return  ResponseEntity.created(new URI("/user/"+saveuser.getId())).body(saveuser); 
	}
	
	  /*
	  @PostMapping("/filter") public List<User> filterUser(@RequestBody Map<String,
	 * String> filter) { if(filter.values().contains("dateStar")) { return
	 * userService.findUserByDateVaccined(Date.valueOf(filter.get("dateStar")),
	 * Date.valueOf(filter.get("dateEnd"))); } else
	 * if(filter.values().contains("typeVaccine")) { return
	 * userService.findUserByTypeVaccine(filter.get("typeVaccine")); } else { return
	 * userService.findUserByVaccinated(filter.get("vaccinated")); }
	 * 
	 * }
	 */
}
